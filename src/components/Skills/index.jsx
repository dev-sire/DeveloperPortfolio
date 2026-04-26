import "./index.scss"
import TagCloud from "./Sphere"
import Loader from "react-loaders"
import AnimatedLetters from "../AnimatedLetters"
import Experience from "./Experience"
import { useEffect, useState } from "react"

const Skills = () => {
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => {
            setLetterClass("text-animate-hover")
        }, 4000)
    }, [])

    return (
        <>
            <div className="container skills-page custom-scrollbar">
                <div className="skills-top">
                    <div className="text-zone">
                        <h1>
                            <AnimatedLetters
                                letterclass={letterClass}
                                strArray={['S','k','i','l','l','s']}
                                idx={15}
                            />
                        </h1>
                        <p>
                            My professional expertise is anchored at the intersection of{' '}
                            <span className="yellow">Full-Stack Engineering, Cybersecurity, and Enterprise Networking</span>.
                            Through a diverse portfolio of hands-on projects—ranging from building real-time
                            collaborative SaaS platforms and high-concurrency streaming engines to engineering
                            AI-driven documentation systems—I specialize in creating secure, scalable, and
                            high-performance digital ecosystems. My approach blends creative UI design with
                            the rigorous logic required for robust, resilient server-side architectures.
                        </p>
                        <p>
                            I bring a research-oriented mindset to every challenge, exemplified by my work in{' '}
                            <span className="yellow">AI Orchestration (Claude & Gemini) </span>
                            and threat detection systems. My dedication to technical excellence is underscored
                            by my{' '}
                            <span className="yellow">CCNP (Cisco Certified Network Professional) certification</span>,
                            which validates my proficiency in managing complex enterprise infrastructures.
                            I am constantly pushing the boundaries of what's possible in tech—let's connect on{' '}
                            <a className="yellow" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/aman-shahid-32708a2b7">
                                LinkedIn
                            </a>{' '}
                            to discuss how we can build the future together.
                        </p>
                    </div>
                    <TagCloud />
                </div>
                <Experience />
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Skills