import "./index.scss"
import Sphere from "./Sphere"
import Loader from "react-loaders"
import AnimatedLetters from "../AnimatedLetters"
import { useEffect, useState } from "react"

const Skills = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    useEffect(() => {
        setTimeout(() => {
            return setLetterClass("text-animate-hover")
        }, 4000)
    }, [])
  return (
    <>
        <div className="container skills-page">
            <div className="text-zone">
                <h1>
                    <AnimatedLetters
                        letterclass={letterClass}
                        strArray={['Skills',' ','&',' ','Experience']}
                        idx={15}
                    />
                </h1>
                <p>
                    My expertise spans <span className="yellow">web development, cybersecurity, and networking</span>. In web development, I craft responsive user interfaces and robust server-side applications. My cybersecurity experience includes implementing security protocols and responding to threats. For networking, I design, implement, and maintain secure infrastructures.
               </p>
               <p>
                    My dedication is underscored by my CCNP certification, showcasing advanced proficiency in enterprise networking. Connect with me on <span className="yellow"><a target="_blank" href="https://www.linkedin.com/in/aman-shahid-32708a2b7"></a>LinkedIn</span> to learn more!
               </p>
            </div>
            <div className="sphere-container">
                <Sphere />
            </div>
        </div>
        <Loader type="pacman" />
    </>
  )
}

export default Skills