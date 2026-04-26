import { useEffect, useRef, useCallback } from 'react'
import './index.scss'

const ENEMY_TYPES = {
    skull: { shape: 'skull', hp: 1, speed: 1.6, size: 32, color: '#e8f4ff', points: 10 },
    orb:   { shape: 'orb',   hp: 3, speed: 1.2, size: 38, color: '#4a8ab5', points: 25 },
    demon: { shape: 'demon', hp: 5, speed: 0.9, size: 44, color: '#cc3333', points: 40 },
    boss:  { shape: 'boss',  hp: 7, speed: 0.65, size: 56, color: '#ffd700', points: 80 },
}

const WAVE_POOLS = [
    [['skull', 1]],
    [['skull', 7], ['orb', 3]],
    [['skull', 5], ['orb', 5]],
    [['skull', 2], ['orb', 6], ['demon', 2]],
    [['orb', 5], ['demon', 3]],
    [['orb', 3], ['demon', 4], ['boss', 1]],
    [['skull', 1], ['orb', 3], ['demon', 5], ['boss', 2]],
]

const WAVE_SPAWN = [
    { interval: 110, multiChance: 0,   multiCount: 0 },
    { interval: 100, multiChance: 0,   multiCount: 0 },
    { interval: 90,  multiChance: 0.2, multiCount: 1 },
    { interval: 80,  multiChance: 0.3, multiCount: 1 },
    { interval: 70,  multiChance: 0.4, multiCount: 1 },
    { interval: 55,  multiChance: 0.4, multiCount: 2 },
    { interval: 40,  multiChance: 0.4, multiCount: 2 },
]

function getWavePool(wave) { return WAVE_POOLS[Math.min(wave - 1, WAVE_POOLS.length - 1)] }
function getWaveSpawn(wave) { return WAVE_SPAWN[Math.min(wave - 1, WAVE_SPAWN.length - 1)] }

function weightedPick(pool) {
    const total = pool.reduce((s, [, w]) => s + w, 0)
    let r = Math.random() * total
    for (const [type, weight] of pool) {
        r -= weight
        if (r <= 0) return type
    }
    return pool[0][0]
}

const KILL_MSGS  = ['SPIKED!', 'GOT EM!', 'PUFF!', 'NICE AIM!', 'BLOWFISH WINS!', 'SPLAT!', 'OBLITERATED!', 'TOO SLOW!', 'CRISPY!', 'NO MERCY!']
const BOSS_MSGS  = ["BIG ONE DOWN!!", 'BOSS SLAIN!', "WHO'S NEXT?!", 'LEGENDARY!', 'UNSTOPPABLE!']
const MISS_MSGS  = ["THEY'RE GETTING THROUGH!", 'HOLD THE LINE!', 'FOCUS!!', "DON'T LET THEM PASS!"]
const NUKE_MSGS  = ['OCEAN WRATH UNLEASHED!', 'EVERYTHING DIES.', 'PUFFER GOES NUCLEAR!', 'TACTICAL FISH STRIKE!', 'NO SURVIVORS.']
const WAVE_MSGS  = ['', 'HERE COME THE ORBS...', 'OUTNUMBERED BUT NOT OUTMATCHED', 'THE DEMONS AWAKEN', 'THINGS ARE GETTING SPICY 🌶', 'BOSSES INCOMING. GOOD LUCK.', 'FULL CHAOS MODE. YOU ASKED FOR THIS.']

function spawnFeedback(feedbacks, x, y, text, color = '#ffd700', size = 15) {
    feedbacks.push({ x, y, text, color, size, life: 70, maxLife: 70, vy: -1.2 })
}

function drawFeedbacks(ctx, feedbacks) {
    feedbacks.forEach(f => {
        ctx.save()
        ctx.globalAlpha = f.life / f.maxLife
        ctx.font = `700 ${f.size}px 'Share Tech Mono', monospace`
        ctx.fillStyle = f.color
        ctx.textAlign = 'center'
        ctx.fillText(f.text, f.x, f.y)
        ctx.restore()
    })
}

function drawEnemy(ctx, e, tick) {
    const { x, y, type, hp, maxHp, size, wobbleOffset } = e
    const cy = y + Math.sin(tick * 0.04 + wobbleOffset) * 3
    const cx = x
    ctx.save()

    if (type.shape === 'skull') {
        ctx.fillStyle = type.color
        ctx.beginPath()
        ctx.arc(cx, cy, size / 2, Math.PI, 0)
        ctx.lineTo(cx + size / 2, cy + size * 0.35)
        ctx.lineTo(cx + size * 0.28, cy + size * 0.35)
        ctx.lineTo(cx + size * 0.28, cy + size * 0.5)
        ctx.lineTo(cx - size * 0.28, cy + size * 0.5)
        ctx.lineTo(cx - size * 0.28, cy + size * 0.35)
        ctx.lineTo(cx - size / 2, cy + size * 0.35)
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle = '#0d1b2a'
        ctx.beginPath(); ctx.arc(cx - size * 0.18, cy - size * 0.05, size * 0.1, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(cx + size * 0.18, cy - size * 0.05, size * 0.1, 0, Math.PI * 2); ctx.fill()

    } else if (type.shape === 'orb') {
        const grad = ctx.createRadialGradient(cx - size * 0.2, cy - size * 0.2, 2, cx, cy, size / 2)
        grad.addColorStop(0, '#8eabc8')
        grad.addColorStop(1, type.color)
        ctx.fillStyle = grad
        ctx.beginPath(); ctx.arc(cx, cy, size / 2, 0, Math.PI * 2); ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5; ctx.stroke()

    } else if (type.shape === 'demon') {
        ctx.fillStyle = type.color
        ctx.beginPath(); ctx.arc(cx, cy, size / 2, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath()
        ctx.moveTo(cx - size * 0.3, cy - size * 0.4)
        ctx.lineTo(cx - size * 0.45, cy - size * 0.8)
        ctx.lineTo(cx - size * 0.15, cy - size * 0.4)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(cx + size * 0.3, cy - size * 0.4)
        ctx.lineTo(cx + size * 0.45, cy - size * 0.8)
        ctx.lineTo(cx + size * 0.15, cy - size * 0.4)
        ctx.fill()
        ctx.fillStyle = '#ffd700'
        ctx.beginPath(); ctx.arc(cx - size * 0.18, cy, size * 0.1, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(cx + size * 0.18, cy, size * 0.1, 0, Math.PI * 2); ctx.fill()

    } else if (type.shape === 'boss') {
        ctx.fillStyle = type.color
        ctx.shadowColor = '#ffd700'; ctx.shadowBlur = 20
        ctx.beginPath()
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4 - Math.PI / 2
            const r = i % 2 === 0 ? size / 2 : size / 4
            const px = cx + r * Math.cos(angle)
            const py = cy + r * Math.sin(angle)
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath(); ctx.fill()
        ctx.shadowBlur = 0
    }

    const barW = size * 1.1, barH = 4
    const barX = cx - barW / 2, barY = cy + size / 2 + 6
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(barX, barY, barW, barH)
    ctx.fillStyle = hp / maxHp > 0.5 ? '#4caf50' : hp / maxHp > 0.25 ? '#ffd700' : '#e53935'
    ctx.fillRect(barX, barY, barW * (hp / maxHp), barH)
    ctx.restore()
}

function drawParticles(ctx, particles) {
    particles.forEach(p => {
        ctx.save()
        ctx.globalAlpha = p.life / p.maxLife
        ctx.fillStyle = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
    })
}

function drawIntro(ctx, w, h, progress) {
    ctx.save()
    const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7)
    bg.addColorStop(0, 'rgba(13,27,42,0.92)')
    bg.addColorStop(1, 'rgba(5,10,18,0.98)')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h)

    const alpha = progress < 0.3 ? progress / 0.3 : progress > 0.75 ? 1 - (progress - 0.75) / 0.25 : 1
    ctx.globalAlpha = alpha

    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1; ctx.setLineDash([6, 4])
    ctx.beginPath(); ctx.moveTo(w * 0.2, h * 0.35); ctx.lineTo(w * 0.8, h * 0.35); ctx.stroke()
    ctx.setLineDash([])

    ctx.font = "13px 'Share Tech Mono', monospace"
    ctx.fillStyle = 'rgba(255,215,0,0.55)'; ctx.textAlign = 'center'
    ctx.fillText('// INITIALIZING THREAT PROTOCOL', w / 2, h * 0.40)

    ctx.font = `700 ${Math.min(72, w * 0.07)}px 'Coolvetica', sans-serif`
    ctx.fillStyle = '#ffd700'
    ctx.shadowColor = 'rgba(255,215,0,0.4)'; ctx.shadowBlur = 24
    ctx.fillText('FISHY GUARDIAN', w / 2, h * 0.50)
    ctx.shadowBlur = 0

    ctx.font = "15px 'Share Tech Mono', monospace"; ctx.fillStyle = '#e8f4ff'
    ctx.fillText('The ocean is under attack. You are the last pufferfish.', w / 2, h * 0.575)

    ctx.font = "12px 'Share Tech Mono', monospace"; ctx.fillStyle = 'rgba(142,171,200,0.8)'
    ctx.fillText("CLICK to damage  ·  [ N ] Nuke when charged  ·  Don't let them reach the bottom", w / 2, h * 0.635)

    ctx.strokeStyle = 'rgba(255,215,0,0.3)'; ctx.setLineDash([6, 4])
    ctx.beginPath(); ctx.moveTo(w * 0.3, h * 0.67); ctx.lineTo(w * 0.7, h * 0.67); ctx.stroke()
    ctx.setLineDash([])

    const secondsLeft = Math.ceil(3 - progress * 3)
    ctx.font = "700 11px 'Share Tech Mono', monospace"
    ctx.fillStyle = 'rgba(255,215,0,0.4)'
    ctx.fillText(`STARTING IN ${secondsLeft}...`, w / 2, h * 0.72)
    ctx.restore()
}

function drawWaveBanner(ctx, w, h, banner) {
    if (!banner || banner.life <= 0) return
    ctx.save()
    const t = banner.life / banner.maxLife
    const alpha = t < 0.2 ? t / 0.2 : t > 0.7 ? (t - 0.7) / 0.3 : 1
    ctx.globalAlpha = alpha * 0.95

    const bw = Math.min(500, w * 0.55), bh = 64
    const bx = w / 2 - bw / 2, by = h * 0.12
    ctx.fillStyle = 'rgba(10, 22, 38, 0.88)'
    ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 8); ctx.fill()
    ctx.strokeStyle = 'rgba(255,215,0,0.4)'; ctx.lineWidth = 1; ctx.stroke()

    ctx.textAlign = 'center'
    ctx.font = "700 11px 'Share Tech Mono', monospace"
    ctx.fillStyle = 'rgba(255,215,0,0.6)'
    ctx.fillText(`WAVE ${banner.wave}`, w / 2, by + 20)
    ctx.font = "700 17px 'Share Tech Mono', monospace"
    ctx.fillStyle = '#e8f4ff'
    ctx.fillText(banner.msg, w / 2, by + 44)
    ctx.restore()
}

// ── Nuke charge bar (bottom center) ──────────────────────────
function drawNukeBar(ctx, W, H, nukeCharge, nukeReady, tick) {
    const barW = 200, barH = 6
    const barX = W / 2 - barW / 2
    const barY = H - 30
    const fillW = (nukeCharge / 100) * barW

    // track
    ctx.save()
    ctx.fillStyle = 'rgba(255,255,255,0.07)'
    ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 3); ctx.fill()

    // fill
    const pulse = nukeReady ? 0.7 + Math.sin(tick * 0.15) * 0.3 : 1
    if (nukeReady) {
        // gold pulsing glow when ready
        ctx.shadowColor = 'rgba(255,215,0,0.6)'
        ctx.shadowBlur = 10
        ctx.fillStyle = `rgba(255, 215, 0, ${pulse})`
    } else {
        // blue → orange gradient as it charges
        const pct = nukeCharge / 100
        const r = Math.round(74 + (255 - 74) * pct)
        const g = Math.round(138 + (152 - 138) * pct)
        const b = Math.round(181 + (0 - 181) * pct)
        ctx.fillStyle = `rgb(${r},${g},${b})`
    }
    ctx.beginPath(); ctx.roundRect(barX, barY, fillW, barH, 3); ctx.fill()
    ctx.shadowBlur = 0

    // label
    ctx.font = "700 10px 'Share Tech Mono', monospace"
    ctx.textAlign = 'center'
    if (nukeReady) {
        ctx.fillStyle = `rgba(255, 215, 0, ${pulse})`
        ctx.shadowColor = 'rgba(255,215,0,0.5)'; ctx.shadowBlur = 8
        ctx.fillText('[ N ]  NUKE READY  [ N ]', W / 2, barY - 8)
        ctx.shadowBlur = 0
    } else {
        ctx.fillStyle = 'rgba(255,255,255,0.28)'
        ctx.fillText(`NUKE  ${Math.floor(nukeCharge)}%`, W / 2, barY - 8)
    }
    ctx.restore()
}

export default function BatGame({ onClose }) {
    const canvasRef = useRef(null)
    const cursorImgRef = useRef(null)
    const stateRef = useRef({
        enemies: [], particles: [], feedbacks: [],
        score: 0, lives: 3, wave: 1, lastWave: 0,
        spawnTimer: 0,
        animFrame: null,
        gameOver: false, tick: 0,
        introDone: false,
        waveBanner: null,
        combo: 0, comboTimer: 0,
        // ── nuke ──
        nukeCharge: 0,
        nukeReady: false,
        nukeFlash: 0,
    })

    useEffect(() => {
        const img = new Image()
        img.src = './pufferfish-cursor.png'
        img.onload = () => { cursorImgRef.current = img }
    }, [])

    const spawnEnemy = useCallback((canvas) => {
        const { wave } = stateRef.current
        const pool = getWavePool(wave)
        const typeName = weightedPick(pool)
        const type = ENEMY_TYPES[typeName]
        const speedMult = 1 + (wave - 1) * 0.08
        stateRef.current.enemies.push({
            x: type.size / 2 + 20 + Math.random() * (canvas.width - type.size - 40),
            y: -type.size,
            type, size: type.size,
            hp: type.hp, maxHp: type.hp,
            speed: type.speed * speedMult,
            wobbleOffset: Math.random() * Math.PI * 2,
        })
    }, [])

    const spawnParticles = useCallback((x, y, color, count = 10) => {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = 1.5 + Math.random() * 3.5
            stateRef.current.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                r: 2 + Math.random() * 3,
                color, life: 40, maxLife: 40,
            })
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
        resize()
        window.addEventListener('resize', resize)

        const mouse = { x: -200, y: -200 }
        const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
        window.addEventListener('mousemove', onMouseMove)

        const onClick = (e) => {
            const s = stateRef.current
            if (s.gameOver || !s.introDone) return
            const { clientX: mx, clientY: my } = e
            let didHit = false

            s.enemies = s.enemies.filter(enemy => {
                const dist = Math.hypot(enemy.x - mx, enemy.y - my)
                if (dist < enemy.size / 2 + 10) {
                    didHit = true
                    enemy.hp -= 1
                    spawnParticles(enemy.x, enemy.y, enemy.type.color, 6)

                    if (enemy.hp <= 0) {
                        s.score += enemy.type.points
                        s.combo++
                        s.comboTimer = 90

                        // ── charge nuke on kill ───────────────
                        const chargeGain = enemy.type.points * 0.8
                        s.nukeCharge = Math.min(100, s.nukeCharge + chargeGain)
                        if (s.nukeCharge >= 100 && !s.nukeReady) {
                            s.nukeReady = true
                            spawnFeedback(s.feedbacks, canvas.width / 2, canvas.height * 0.88, '[ N ]  NUKE READY', '#ffd700', 16)
                        }

                        spawnParticles(enemy.x, enemy.y, '#ffd700', 16)

                        const isBoss = enemy.type.shape === 'boss'
                        const msgs = isBoss ? BOSS_MSGS : KILL_MSGS
                        const msg = msgs[Math.floor(Math.random() * msgs.length)]
                        const color = isBoss ? '#ffd700' : s.combo >= 5 ? '#ff9800' : '#e8f4ff'
                        const size = isBoss ? 20 : s.combo >= 3 ? 17 : 14
                        spawnFeedback(s.feedbacks, enemy.x, enemy.y - enemy.size / 2 - 10, msg, color, size)

                        if (s.combo >= 3) {
                            spawnFeedback(s.feedbacks, enemy.x, enemy.y - enemy.size / 2 - 34, `${s.combo}x COMBO!`, '#ff9800', 13)
                        }
                        return false
                    }
                }
                return true
            })

            if (!didHit) s.combo = 0
        }
        canvas.addEventListener('click', onClick)

        // ── Nuke key listener ─────────────────────────────────
        const onKeyDown = (e) => {
            if (e.key !== 'n' && e.key !== 'N') return
            const s = stateRef.current
            if (!s.nukeReady || s.gameOver || !s.introDone) return

            const W = canvas.width, H = canvas.height

            // blast every enemy off the screen
            s.enemies.forEach(enemy => {
                s.score += Math.floor(enemy.type.points * 0.5) // half points — nuking isn't free
                // burst of particles from each enemy position
                spawnParticles(enemy.x, enemy.y, '#ffd700', 22)
                spawnParticles(enemy.x, enemy.y, '#ffffff', 10)
                spawnParticles(enemy.x, enemy.y, enemy.type.color, 12)
            })
            s.enemies = []

            // nuke state reset
            s.nukeCharge = 0
            s.nukeReady = false
            s.nukeFlash = 18  // frames of white flash

            // random dramatic feedback center screen
            const msg = NUKE_MSGS[Math.floor(Math.random() * NUKE_MSGS.length)]
            spawnFeedback(s.feedbacks, W / 2, H / 2 - 20, msg, '#ffd700', 26)
        }
        window.addEventListener('keydown', onKeyDown)

        canvas.style.cursor = 'none'

        const INTRO_DURATION = 180

        const loop = () => {
            const s = stateRef.current
            const W = canvas.width, H = canvas.height
            ctx.clearRect(0, 0, W, H)
            s.tick++

            // ── Intro ─────────────────────────────────────────
            if (!s.introDone) {
                const progress = Math.min(s.tick / INTRO_DURATION, 1)
                drawIntro(ctx, W, H, progress)
                if (s.tick >= INTRO_DURATION) {
                    s.introDone = true
                    s.waveBanner = { wave: 1, msg: 'WAVES BEGIN. START SMALL.', life: 150, maxLife: 150 }
                    s.lastWave = 1
                }
                if (cursorImgRef.current) ctx.drawImage(cursorImgRef.current, mouse.x - 24, mouse.y - 24, 48, 48)
                s.animFrame = requestAnimationFrame(loop)
                return
            }

            // ── Game logic ────────────────────────────────────
            if (!s.gameOver) {
                const newWave = Math.floor(s.score / 250) + 1
                if (newWave !== s.wave) {
                    s.wave = newWave
                    const msg = WAVE_MSGS[Math.min(newWave - 1, WAVE_MSGS.length - 1)]
                    if (msg) s.waveBanner = { wave: newWave, msg, life: 150, maxLife: 150 }
                }

                if (s.comboTimer > 0) s.comboTimer--
                else s.combo = 0

                const spawnCfg = getWaveSpawn(s.wave)
                s.spawnTimer++
                if (s.spawnTimer >= spawnCfg.interval) {
                    s.spawnTimer = 0
                    spawnEnemy(canvas)
                    for (let i = 0; i < spawnCfg.multiCount; i++) {
                        if (Math.random() < spawnCfg.multiChance) spawnEnemy(canvas)
                    }
                }

                s.enemies = s.enemies.filter(enemy => {
                    enemy.y += enemy.speed
                    if (enemy.y > H + enemy.size) {
                        s.lives -= 1
                        s.combo = 0
                        spawnParticles(enemy.x, H - 30, '#e53935', 10)
                        const msg = MISS_MSGS[Math.floor(Math.random() * MISS_MSGS.length)]
                        spawnFeedback(s.feedbacks, W / 2, H - 60, msg, '#e53935', 14)
                        if (s.lives <= 0) s.gameOver = true
                        return false
                    }
                    return true
                })

                s.particles = s.particles.filter(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life--; return p.life > 0 })
                s.feedbacks = s.feedbacks.filter(f => { f.y += f.vy; f.life--; return f.life > 0 })
                if (s.waveBanner) { s.waveBanner.life--; if (s.waveBanner.life <= 0) s.waveBanner = null }
            }

            // ── Render ────────────────────────────────────────
            ctx.fillStyle = 'rgba(13, 27, 42, 0.15)'; ctx.fillRect(0, 0, W, H)

            // danger line
            ctx.save()
            ctx.strokeStyle = 'rgba(229, 57, 53, 0.2)'; ctx.lineWidth = 1; ctx.setLineDash([8, 6])
            ctx.beginPath(); ctx.moveTo(0, H - 8); ctx.lineTo(W, H - 8); ctx.stroke()
            ctx.setLineDash([]); ctx.restore()

            s.enemies.forEach(e => drawEnemy(ctx, e, s.tick))
            drawParticles(ctx, s.particles)
            drawFeedbacks(ctx, s.feedbacks)
            drawWaveBanner(ctx, W, H, s.waveBanner)

            // ── Nuke flash ────────────────────────────────────
            if (s.nukeFlash > 0) {
                ctx.save()
                ctx.fillStyle = `rgba(255, 230, 100, ${(s.nukeFlash / 18) * 0.75})`
                ctx.fillRect(0, 0, W, H)
                ctx.restore()
                s.nukeFlash--
            }

            // ── Nuke bar ──────────────────────────────────────
            if (!s.gameOver) drawNukeBar(ctx, W, H, s.nukeCharge, s.nukeReady, s.tick)

            // ── HUD ───────────────────────────────────────────
            ctx.font = "700 16px 'Share Tech Mono', monospace"
            ctx.textAlign = 'left'; ctx.fillStyle = '#ffd700'
            ctx.fillText(`SCORE  ${s.score}`, 24, 38)
            ctx.fillText(`WAVE   ${s.wave}`, 24, 60)
            ctx.fillStyle = '#e8f4ff'
            ctx.fillText(`LIVES  ${'♥ '.repeat(Math.max(0, s.lives)).trim()}`, 24, 82)

            if (s.combo >= 2) {
                ctx.textAlign = 'right'
                ctx.font = `700 ${14 + Math.min(s.combo, 10)}px 'Share Tech Mono', monospace`
                ctx.fillStyle = s.combo >= 5 ? '#ff9800' : '#ffd700'
                ctx.globalAlpha = 0.85
                ctx.fillText(`${s.combo}x COMBO`, W - 24, 60)
                ctx.globalAlpha = 1
            }

            ctx.font = "11px 'Share Tech Mono', monospace"
            ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.textAlign = 'right'
            ctx.fillText('ESC to exit', W - 24, 28)
            ctx.textAlign = 'left'

            // ── Cursor ────────────────────────────────────────
            if (cursorImgRef.current) {
                ctx.drawImage(cursorImgRef.current, mouse.x - 28, mouse.y - 28, 56, 56)
            } else {
                ctx.save()
                ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2)
                ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2; ctx.stroke()
                ctx.restore()
            }

            // ── Game Over ─────────────────────────────────────
            if (s.gameOver) {
                ctx.fillStyle = 'rgba(10,20,35,0.88)'; ctx.fillRect(0, 0, W, H)
                ctx.textAlign = 'center'

                ctx.font = `700 ${Math.min(64, W * 0.06)}px 'Coolvetica', sans-serif`
                ctx.fillStyle = '#ffd700'
                ctx.shadowColor = 'rgba(255,215,0,0.35)'; ctx.shadowBlur = 20
                ctx.fillText('GAME OVER', W / 2, H / 2 - 60)
                ctx.shadowBlur = 0

                const signOff = s.score < 50   ? 'The ocean did not deserve this.'
                    : s.score < 150 ? 'A valiant attempt. Very valiant.'
                    : s.score < 300 ? 'The fish fought bravely.'
                    : s.score < 500 ? 'Respectable. The ocean is proud.'
                    : s.score < 800 ? 'You were built for this.'
                    : 'LEGEND. The sea will sing your name.'

                ctx.font = "14px 'Share Tech Mono', monospace"
                ctx.fillStyle = 'rgba(255,215,0,0.55)'
                ctx.fillText(signOff, W / 2, H / 2 - 22)

                ctx.font = "20px 'Share Tech Mono', monospace"; ctx.fillStyle = '#e8f4ff'
                ctx.fillText(`Final Score: ${s.score}`, W / 2, H / 2 + 18)
                ctx.fillText(`Waves Survived: ${s.wave}`, W / 2, H / 2 + 48)

                ctx.font = "13px 'Share Tech Mono', monospace"
                ctx.fillStyle = 'rgba(255,215,0,0.45)'
                ctx.fillText('Press ESC to exit', W / 2, H / 2 + 94)
                ctx.textAlign = 'left'
            }

            s.animFrame = requestAnimationFrame(loop)
        }

        stateRef.current.animFrame = requestAnimationFrame(loop)

        return () => {
            cancelAnimationFrame(stateRef.current.animFrame)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouseMove)
            canvas.removeEventListener('click', onClick)
            window.removeEventListener('keydown', onKeyDown)  // clean up nuke listener
        }
    }, [spawnEnemy, spawnParticles])

    return (
        <div className="bat-game-overlay">
            <canvas ref={canvasRef} className="bat-game-canvas" />
        </div>
    )
}