import { useEffect, useState } from "react"
import AnimatedLetters from "../AnimatedLetters"
import "./index.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGitAlt, faReact } from "@fortawesome/free-brands-svg-icons"
import python_logo from "../../assets/images/python_logo_im.png"
import mongodblogo from "../../assets/images/mongodb-logo.svg"
import tslogo from "../../assets/images/typescript-logo.png"
import appwritelogo from "../../assets/images/appwrite-logo.png"
import Loader from "react-loaders"
const About = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    useEffect(() => {
        setTimeout(() => {
            return setLetterClass("text-animate-hover")
        }, 3000)
    }, [])
    return (
        <>
            <div className="container about-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters
                            letterclass={letterClass}
                            strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
                            idx={15}
                        />
                    </h1>
                    <p>
                        I am a passionate MERN Stack developer with a keen interest in crafting robust and scalable web applications. With a strong foundation in <span className="yellow">React, Node.js, Express, and MongoDB</span>, I excel at building dynamic and interactive user experiences. I am proficient in developing both frontend and backend solutions, enabling me to deliver comprehensive and efficient web applications.
                    </p>
                    <p>
                    Alongside my web development journey, I have honed my problem-solving skills through competitive programming on platforms like <a href="https://leetcode.com/u/AmanShahid009/" className="link">LeetCode</a>. This experience has equipped me with a strong algorithmic foundation, enabling me to write optimized and efficient code.
                    </p>
                    <p>
                    I am deeply interested in <span className="yellow">web security </span>and understand the importance of protecting user data. I have a strong foundation in secure coding practices and am always eager to learn about the latest vulnerabilities and mitigation techniques. I strive to build applications that are resilient against cyber threats and prioritize user privacy.
                    </p>
                </div>
                <div className="stage-cube-cont">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                    <div className="cubespinner">
                        <div className="face1">
                            <img src={mongodblogo} className="logo" alt="logo" />
                        </div>
                        <div className="face2">
                            <FontAwesomeIcon icon={faReact} color="#5ed4f4" />
                        </div>
                        <div className="face3">
                            <img src={tslogo} className="logo" alt="typescript-logo" />
                        </div>
                        <div className="face4">
                            <img src={appwritelogo} className="logo" alt="css-logo" />
                        </div>
                        <div className="face5">
                            <img src={python_logo} className="logo" alt="brandPython logo" />
                        </div>
                        <div className="face6">
                            <FontAwesomeIcon icon={faGitAlt} color="#ec4d28" />
                        </div>
                    </div>
                </div>   
            </div>
            <Loader type="pacman" />
        </>
    )
}
export default About