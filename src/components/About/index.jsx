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
                        Driven by a passion for innovation, I am a highly motivated professional constantly seeking opportunities to expand my knowledge and make a significant impact in the tech industry. My ambition fuels my pursuit of challenging projects and my dedication to mastering new technologies, always with an eye towards creating robust and scalable solutions.
                    </p>
                    <p>
                        I approach every challenge with a confident and proactive mindset, leveraging my strong problem-solving abilities and adaptability to navigate complex technical landscapes. My experience has equipped me with the skills to not only identify issues but also to effectively implement solutions, ensuring successful project delivery and optimal system performance.
                    </p>
                    <p>
                        My enthusiasm for technology is matched only by my commitment to continuous learning and growth. I am captivated by the ever-evolving world of <span className="yellow">web development, cybersecurity, and networking</span>, seeing each new development as an exciting opportunity to learn and apply cutting-edge practices. I thrive in dynamic environments where I can contribute my skills and collaborate on impactful projects.
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