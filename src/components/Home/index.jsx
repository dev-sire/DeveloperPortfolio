import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import './index.scss'
import Loader from 'react-loaders'

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['A', 'm', 'a', 'n', ' ', 'S', 'h', 'a', 'h', 'i', 'd']
    const jobArray = ['M', 'E', 'R', 'N', ' ', 'S', 't', 'a', 'c', 'k', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']
    useEffect(() => {
        setTimeout(() => {
            return setLetterClass("text-animate-hover")
        }, 5000)
    }, [])
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
                    <h2>FullStack Developer / Competitive Programmer / Web Security Analyst</h2>
                    <Link to="/DeveloperPortfolio/contact" className='flat-button'>CONTACT ME</Link>
                </div>
                <Logo />
            </div>
            <Loader type='pacman' />
        </>
    )
}
export default Home