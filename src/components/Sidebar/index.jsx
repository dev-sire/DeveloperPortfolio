import { Link, NavLink } from "react-router-dom"
import {useState} from "react"
import "./index.scss"
import logoS from "../../assets/images/logo-s.png"
import logoSubtitle from "../../assets/images/DevSire_sublogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faClose, faEnvelope, faGear, faHome, faSuitcase, faUser } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
const Sidebar = () => {
    const [showNav, setShowNav] = useState(false)
    return (
        <div className="nav-bar">
            <Link className="logo" to="/">
                <img src={logoS} alt="Mainlogo" />
                <img className="sub-logo" src={logoSubtitle} alt="logo subtitle" />
            </Link>
            <nav className={showNav ? "mobile-show" : ""}>
                <NavLink exact="true" activeclassname="active" onClick={() => setShowNav(false)} to="/">
                    <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
                </NavLink>
                <NavLink exact="true" activeclassname="active" onClick={() => setShowNav(false)} className="about-link" to="/DeveloperPortfolio/about">
                    <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
                </NavLink>
                <NavLink exact="true" activeclassname="active" onClick={() => setShowNav(false)} className="skills-link" to="/DeveloperPortfolio/skills">
                    <FontAwesomeIcon icon={faGear} color="#4d4d4e" />
                </NavLink>
                <NavLink exact="true" activeclassname="active" onClick={() => setShowNav(false)} className="portfolio-link" to="/DeveloperPortfolio/portfolio">
                    <FontAwesomeIcon icon={faSuitcase} color="#4d4d4e" />
                </NavLink>
                <NavLink exact="true" activeclassname="active" onClick={() => setShowNav(false)} className="contact-link" to="/DeveloperPortfolio/contact">
                    <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
                </NavLink>
                <FontAwesomeIcon icon={faClose} onClick={() => setShowNav(false)} className="close-btn" color="#ffd700" size="3x" />
            </nav>
            <ul>
                <li>
                    <a target="_blank" rel="noreferer" href="https://www.linkedin.com/in/aman-shahid-32708a2b7">
                        <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" />
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noreferer" href="https://github.com/dev-sire">
                        <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noreferer" href="https://www.instagram.com/devsirecodes/">
                        <FontAwesomeIcon icon={faInstagram} color="#4d4d4e" />
                    </a>
                </li>
            </ul>
            <FontAwesomeIcon onClick={() => setShowNav(true)} icon={faBars} color="#ffd700" size="3x" className="hamburger-icon" />
        </div>
    )
}
export default Sidebar