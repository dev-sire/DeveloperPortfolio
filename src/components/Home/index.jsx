import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import './index.scss'
import Loader from 'react-loaders'

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['A', 'm', 'a', 'n', ' ', 'S', 'h', 'a', 'h', 'i', 'd']
    const jobArray = ['M', 'E', 'R', 'N',' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']
    // const jobArray = ['S', 'e', 'c', 'u', 'r', 'i', 't', 'y', ' ', 'P', 'r', 'a', 'c', 't', 'i', 't', 'i', 'o', 'n', 'e', 'r']
    useEffect(() => {
        setTimeout(() => {
            return setLetterClass("text-animate-hover")
        }, 5000)
    }, [])

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/DeveloperPortfolio/Resume_Aman_Shahid.pdf';
        link.download = 'Resume_Aman_Shahid.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
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
                    <button onClick={handleDownloadResume} className='flat-button'>RESUME</button>
                    <button onClick={handleDownloadResume} className='flat-button'>RESUME</button>
                </div>
                <Logo />
            </div>
            <Loader type='pacman' />
        </>
    )
}
export default Home