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
                As a full-stack developer, I have successfully built and deployed multiple web applications using the <span className="yellow">MERN stack</span>. My experience encompasses both frontend and backend development, allowing me to create robust and efficient solutions. I am particularly proud of my work on <span className="yellow">Visage Share</span>, a real-time social media app, where I handled the entire development lifecycle, from conception to deployment. I am committed to continuous improvement and actively maintain and update my projects to incorporate the latest technologies and best practices.
               </p>
               <p>
               I am committed to staying up-to-date with the rapidly evolving tech landscape. I actively pursue knowledge in <span className="yellow">web development</span>, exploring new frameworks and libraries. Additionally, I consistently challenge myself with <span className="yellow">competitive programming</span> to sharpen my problem-solving skills. With a keen interest in <span className="yellow">cybersecurity</span>, I stay informed about the latest threats and countermeasures to build robust and secure applications.
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