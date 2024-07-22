import Loader from "react-loaders"
import "./index.scss"
import AnimatedLetters from "../AnimatedLetters"
import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../../firebase"

const Portfolio = () =>{
    const [letterClass, setLetterClass] = useState('text-animate')
    const [portfolio, setPortfolio] = useState([])

    useEffect(() => {
        setTimeout(() => {
            return setLetterClass("text-animate-hover")
        }, 3000)
    }, [])

    const getPortfolio = async () => {
        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        setPortfolio(querySnapshot.docs.map((doc) => doc.data()).sort((a,b) => (a.timestamp > b.timestamp ? -1 : 1)));
    }

    useEffect(() => {
        getPortfolio()
    }, [])

    const renderPortfolio = (portfolio) => {
        return(
            <div className="image-container">
                {
                    portfolio.map((port, idx)=>{
                        return(
                            <div className="image-box" key={idx}>
                                <img src={port.image} className="portfolio-image" alt="portfolio" />
                                <div className="content">
                                    <p className="title">{port.name}</p>
                                    <h3 className="description">{port.description}</h3>
                                    <button className="btn" onClick={()=> window.open(port.url)}>Visit</button>
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
            <div className="container portfolio-page custom-scrollbar">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterclass={letterClass}
                        strArray={"Projects".split("")}
                        idx={15}
                    />
                </h1>
                <div>{renderPortfolio(portfolio)}</div>
            </div>
            <Loader type="pacman"/>
        </>
    )
}

export default Portfolio