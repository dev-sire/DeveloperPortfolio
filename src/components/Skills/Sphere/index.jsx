import "./index.scss"
import React, { useEffect, useRef, useState } from 'react';

const TagCloud = ({ options, tags }) => {
  const canvasRef = useRef(null);
  const tagsRef = useRef(null);
  const [errorState, setErrorState] = useState(null); // State to hold potential error

  useEffect(() => {
    if (window.TagCanvas) {
      try {
        window.TagCanvas.Start(
          canvasRef.current.id,
          tagsRef.current.id,
          options
        );
        setErrorState(null); // Clear error on successful start
      } catch (e) {
        console.error('TagCanvas error:', e);
        setErrorState(e); // <--- Assigning the Error object to state
        if (canvasRef.current) {
          canvasRef.current.parentElement.style.display = 'none';
        }
      }
    } else {
      console.warn('TagCanvas not found. Make sure tagcanvas.min.js is loaded.');
      setErrorState(new Error('TagCanvas script not loaded.')); // Example
    }
    // ... cleanup
  }, [options, tags]);

  return (
    <>
      {errorState && ( // <--- Trying to render errorState directly
        <p style={{ color: 'red' }}>Error: {errorState}</p> // PROBLEM: React can't render [object Error]
      )}
      <div className="skills-chart">
        <div id="myCanvasContainer">
          <canvas ref={canvasRef} width="500" height="500" id="myCanvas">
            <p>Anything in here will be replaced on browsers that support the canvas element</p>
          </canvas>
        </div>
        <div id="tags" ref={tagsRef} style={{ display: 'none' }}>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>
                <a href={tag.href} target={tag.target || '_blank'}>
                  {tag.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TagCloud;