import Loader from "react-loaders"
import "./index.scss"
import AnimatedLetters from "../AnimatedLetters"
import PortfolioData from "../../Data/data.json"
import { useEffect, useState } from "react"

const Portfolio = () =>{
    const [letterClass, setLetterClass] = useState('text-animate')
    useEffect(() => {
        setTimeout(() => {
            return setLetterClass("text-animate-hover")
        }, 3000)
    }, [])
    const renderPortfolio = (portfolio) => {
        return(
            <div className="image-container">
                {
                    portfolio.map((port, idx)=>{
                        return(
                            <div className="image-box" key={idx}>
                                <img src={port.cover} className="portfolio-image" alt="portfolio" />
                                <div className="content">
                                    <p className="title">{port.title}</p>
                                    <h3 className="description">{port.description}</h3>
                                    {port.isLive ? (
                                            <button className="btn" onClick={()=> window.open(port.url)}>Visit Now</button>
                                            ): (
                                            <button className="btn" onClick={()=> window.open(port.url)}>View Code</button>    
                                        )}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterclass={letterClass}
                        strArray={"Projects".split("")}
                        idx={15}
                    />
                </h1>
                <div>{renderPortfolio(PortfolioData.portfolio)}</div>
            </div>
            <Loader type="pacman"/>
        </>
    )
}

export default Portfolio