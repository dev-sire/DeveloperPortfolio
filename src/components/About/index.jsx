import { useEffect, useState } from "react"
import AnimatedLetters from "../AnimatedLetters"
import "./index.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGitAlt, faReact } from "@fortawesome/free-brands-svg-icons"
import python_logo from "../../assets/images/python_logo_im.png"
import javalogo from "../../assets/images/java2.png"
import jslogo from "../../assets/images/javascript-logo.png"
import csslogo from "../../assets/images/css3-logo.png"
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
                    I'm a MERN Stack developer and <span className="yellow">React expert</span> with a passion for crafting intuitive and visually stunning user experiences. Don't let the code fool you, I also leverage in the worlds of <span className="yellow">Java and Python</span>, offering intermediate-level proficiency to enhance my problem-solving toolkit.
                    </p>
                    <p>
                    I build robust and scalable backends using the MERN stack, while simultaneously designing interactive and user-friendly frontends with React. My code is not just functional, it's elegant, maintainable, and built with user experience in mind.
                    </p>
                    <p>
                    Beyond the technical skills, I value clear <span className="yellow">communication and collaboration</span>. I work closely with stakeholders to understand their needs and deliver solutions that exceed expectations. Whether it's a complex web application or a simple design tweak, I approach each project with the same dedication and enthusiasm.
                    </p>
                </div>
                <div className="stage-cube-cont">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                    <div className="cubespinner">
                        <div className="face1">
                            <img src={javalogo} className="logo" alt="logo" />
                        </div>
                        <div className="face2">
                            <FontAwesomeIcon icon={faReact} color="#5ed4f4" />
                        </div>
                        <div className="face3">
                            <img src={jslogo} className="logo" alt="javascript-logo" />
                        </div>
                        <div className="face4">
                            <img src={csslogo} className="logo" alt="css-logo" />
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