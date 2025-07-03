import "./index.scss"
import TagCloud from "./Sphere"
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
    const tagCanvasOptions = {
        textColour: '#fff',
        outlineColour: '#fff',
        depth: 0.9,
        maxSpeed: 0.08,
    };

  const myTags = [
        { href: "http://en.wikipedia.org/wiki/HTML", text: "HTML" },
        { href: "https://www.mongodb.com", text: "MongoDB" },
        { href: "https://expressjs.com/", text: "ExpressJS" },
        { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", text: "JavaScript" },
        { href: "https://www.typescriptlang.org/", text: "TypeScript" },
        { href: "https://react.dev/", text: "ReactJS" },
        { href: "https://nextjs.org/", text: "NextJS" },
        { href: "https://nodejs.org/en", text: "NodeJS" },
        { href: "https://flask.palletsprojects.com/en/stable/#", text: "Flask" },
        { href: "https://www.djangoproject.com/", text: "Django" },
        { href: "https://www.python.org/", text: "Python" },
        { href: "https://developer.mozilla.org/en-US/docs/Web/CSS", text: "CSS" },
        { href: "https://sass-lang.com/", text: "SCSS" },
        { href: "https://tailwindcss.com/", text: "TailwindCSS" },
        { href: "https://www.mysql.com/", text: "MySQL" },
        { href: "https://www.cisco.com/", text: "Networking" },
        { href: "https://supabase.com/", text: "Supabase" },
    ];
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
            <TagCloud options={tagCanvasOptions} tags={myTags} />
        </div>
        <Loader type="pacman" />
    </>
  )
}

export default Skills