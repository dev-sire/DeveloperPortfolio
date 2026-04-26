import { useEffect, useRef, useState } from "react"
import AnimatedLetters from "../../AnimatedLetters"
import "./styles.scss"

const experiences = [
    {
        year: "04/24 - Onwards",
        role: "Associate Network Engineer",
        company: "// Corning Inc.",
        desc: "Responsible for maintaining and optimizing the corporate network infrastructure, including routers, switches, and firewalls. Implementing security measures and monitoring network performance to ensure reliability and security.",
        tags: ["Network Management", "FTTH/FTTE", "Optical Fiber", "Firewall Configuration"],
    },
    {
        year: "07/24 - Onwards",
        role: "Instructor",
        company: "// Cisco Networking Academy",
        desc: "Delivering comprehensive courses on networking fundamentals, cybersecurity principles, and hands-on labs. Mentoring students to achieve CCNA certification.",
        tags: ["CCNA", "Networking Education", "Cybersecurity Training", "Cisco"],
    },
    {
        year: "08/24 - 09/24",
        role: "Networking Intern",
        company: "// Business IT Solutions",
        desc: "Worked Hands-on with network infrastructure, assisting in configuration and troubleshooting of routers, switches, and firewalls. Gained practical experience in network management and security in H3C networks.",
        tags: ["SMB", "Switches", "MSR610", "H3C Aolynk"],
    },
]

const Experience = () => {
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => setLetterClass("text-animate-hover"), 4000)
    }, [])

    const itemsRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add("visible")
            }),
            { threshold: 0.15 }
        )
        itemsRef.current.forEach(el => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section className="experience-section">
            <h1>
                <AnimatedLetters
                    letterclass={letterClass}
                    strArray={['E', 'x', 'p', 'e', 'r', 'i', 'e', 'n', 'c', 'e']}
                    idx={15}
                />
            </h1>
            <div className="tl-wrapper">
                <div className="tl-line" />
                <div className="tl-items">
                    {experiences.map((exp, i) => {
                        const isLeft = i % 2 === 0
                        return (
                            <div
                                className={`tl-item ${isLeft ? "left" : "right"}`}
                                key={i}
                                ref={el => itemsRef.current[i] = el}
                            >
                                {isLeft ? (
                                    <>
                                        <div className="tl-card">
                                            <p className="tl-role">{exp.role}</p>
                                            <p className="tl-company">{exp.company}</p>
                                            <p className="tl-desc">{exp.desc}</p>
                                            <div className="tl-tags">
                                                {exp.tags.map(t => <span key={t} className="tl-tag">{t}</span>)}
                                            </div>
                                        </div>
                                        <div className="tl-node-wrap">
                                            <div className="tl-node" />
                                            <span className="tl-year tl-year--right">{exp.year}</span>
                                        </div>
                                        <div className="tl-spacer" />
                                    </>
                                ) : (
                                    <>
                                        <div className="tl-spacer" />
                                        <div className="tl-node-wrap">
                                            <span className="tl-year tl-year--left">{exp.year}</span>
                                            <div className="tl-node" />
                                        </div>
                                        <div className="tl-card">
                                            <p className="tl-role">{exp.role}</p>
                                            <p className="tl-company">{exp.company}</p>
                                            <p className="tl-desc">{exp.desc}</p>
                                            <div className="tl-tags">
                                                {exp.tags.map(t => <span key={t} className="tl-tag">{t}</span>)}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Experience