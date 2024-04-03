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
                        strArray={['S','k','i','l','l','s',' ','&',' ','E','x','p','e','r','i','e','n','c','e']}
                        idx={15}
                    />
                </h1>
                <p>
                This page delves into the world of code that fuels my passion. Here, you'll discover my proficiency as a MERN Stack developer, where I wield the power of <span className="yellow">MongoDB, Express, React, and Node.js</span> to build robust and scalable web applications. But my journey doesn't stop there. As an intermediate <span className="yellow">Java and Python developer</span>, I'm constantly expanding my horizons, leveraging these languages for performance-critical tasks and efficient automation.
               </p>
                <p>
                Furthermore, the desire to learn never ceases to simmer. I'm an active learner, always on the lookout for new technologies and frameworks to integrate into my skillset. This continuous pursuit of knowledge ensures I can tackle your projects with both <span className="yellow">expertise and fresh perspectives.</span>
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