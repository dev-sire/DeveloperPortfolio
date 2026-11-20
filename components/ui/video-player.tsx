"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number) => {
  if (!isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// Plain button so the player does not depend on the project's shadcn Button variant.
const IconButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    className={cn(
      "inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-white transition-colors hover:bg-[#111111d1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
      className
    )}
    {...props}
  />
);

const CustomSlider = ({
  value,
  onChange,
  className,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  label: string;
}) => {
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromPointer = (clientX: number) => {
    const rect = track.current?.getBoundingClientRect();
    if (!rect || !rect.width) return;
    onChange(Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100));
  };

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      className={cn("flex h-4 w-full cursor-pointer items-center", className)}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onKeyDown={(e) => {
        const step = e.key === "ArrowRight" || e.key === "ArrowUp" ? 5 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -5 : 0;
        if (step) {
          e.preventDefault();
          onChange(Math.min(Math.max(value + step, 0), 100));
        }
      }}
    >
      <motion.div ref={track} className="relative h-1 w-full rounded-full bg-white/20">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </motion.div>
    </div>
  );
};

type VideoPlayerProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  className?: string;
  onError?: () => void;
};

const VideoPlayer = ({ src, poster, autoPlay = false, className, onError }: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVolume = useRef(1);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Controls stay up while paused, and on touch screens they appear for a few seconds after a tap.
  const controlsVisible = showControls || !isPlaying;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      const newVolume = value / 100;
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      if (newVolume > 0) lastVolume.current = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(isFinite(percent) ? percent : 0);
      setCurrentTime(video.currentTime);
      if (isFinite(video.duration)) setDuration(video.duration);
    }
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (video && video.duration) {
      const time = (value / 100) * video.duration;
      if (isFinite(time)) {
        video.currentTime = time;
        setProgress(value);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
    if (next) {
      setVolume(0);
    } else {
      video.volume = lastVolume.current;
      setVolume(lastVolume.current);
    }
  };

  const setSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else containerRef.current?.requestFullscreen?.();
  };

  const flashControls = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2800);
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_0_20px_rgba(0,0,0,0.2)]",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onTouchStart={flashControls}
    >
      <video
        ref={videoRef}
        className="block h-full w-full bg-black object-contain"
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        autoPlay={autoPlay}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={onError}
      />

      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            type="button"
            aria-label="Play video"
            onClick={togglePlay}
            className="absolute left-1/2 top-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e32b3c] pl-1 text-white shadow-[0_0_40px_rgba(227,43,60,0.4)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <Play className="h-8 w-8" fill="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {controlsVisible && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 m-2 mx-auto max-w-xl rounded-2xl bg-[#11111198] p-3 backdrop-blur-md sm:p-4"
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "circInOut", type: "spring" }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-white">{formatTime(currentTime)}</span>
              <CustomSlider value={progress} onChange={handleSeek} className="flex-1" label="Seek" />
              <span className="text-sm text-white">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </IconButton>
                </motion.div>
                <div className="flex items-center gap-x-1">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                      {isMuted ? <VolumeX className="h-5 w-5" /> : volume > 0.5 ? <Volume2 className="h-5 w-5" /> : <Volume1 className="h-5 w-5" />}
                    </IconButton>
                  </motion.div>
                  <div className="hidden w-24 sm:block">
                    <CustomSlider value={volume * 100} onChange={handleVolumeChange} label="Volume" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <div className="hidden items-center gap-2 sm:flex">
                  {[0.5, 1, 1.5, 2].map((speed) => (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} key={speed}>
                      <IconButton onClick={() => setSpeed(speed)} aria-label={`Speed ${speed}x`} className={cn(playbackSpeed === speed && "bg-[#111111d1]")}>
                        {speed}x
                      </IconButton>
                    </motion.div>
                  ))}
                </div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton onClick={toggleFullscreen} aria-label="Fullscreen">
                    <Maximize className="h-5 w-5" />
                  </IconButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoPlayer;
