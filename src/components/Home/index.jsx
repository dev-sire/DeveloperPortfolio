import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import './index.scss'
import Loader from 'react-loaders'
import BatGame from '../BatGame'

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [gameActive, setGameActive] = useState(false)

    const nameArray = ['A', 'm', 'a', 'n', ' ', 'S', 'h', 'a', 'h', 'i', 'd']
    const jobArray = ['M', 'E', 'R', 'N', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']

    useEffect(() => {
        setTimeout(() => setLetterClass("text-animate-hover"), 5000)
    }, [])

    // Ctrl+Space to launch, ESC to close
    useEffect(() => {
        const isMobile = window.innerWidth <= 1200 || 'ontouchstart' in window
        if (isMobile) return

        const onKeyDown = (e) => {
            if (e.ctrlKey && e.code === 'Space') {
                e.preventDefault()
                setGameActive(true)
            }
            if (e.key === 'Escape') {
                setGameActive(false)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    const handleDownloadResume = () => {
        const link = document.createElement('a')
        link.href = "/Resume_Aman_Shahid.pdf"
        link.download = 'Resume_Aman_Shahid.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                        <span className={letterClass}>H</span>
                        <span className={`${letterClass} _12`}>i,</span>
                        <br />
                        <span className={`${letterClass} _13`}>I</span>
                        <span className={`${letterClass} _14`}>'m</span>
                        <span> </span>
                        <AnimatedLetters letterclass={letterClass} strArray={nameArray} idx={15} />
                        <br />
                        <AnimatedLetters letterclass={letterClass} strArray={jobArray} idx={26} />
                    </h1>
                    <h2>Full-Stack Development / Networking / Cyber Security</h2>
                    <div className="home-buttons">
                        <button onClick={handleDownloadResume} className='flat-button'>RESUME</button>
                        {/* <span className="game-hint">ctrl + space to play</span> */}
                    </div>
                </div>
                <Logo />
            </div>

            {gameActive && <BatGame onClose={() => setGameActive(false)} />}

            <Loader type='pacman' />
        </>
    )
}

export default Home