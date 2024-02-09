import Loader from "react-loaders"
import "./index.scss"
import AnimatedLetters from "../AnimatedLetters"
import { useEffect, useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

const Contact = () => {
    const refForm = useRef();
    const [letterClass, setLetterClass] = useState('text-animate')
    useEffect(() => {
        setTimeout(() => {
            return setLetterClass("text-animate-hover")
        }, 3000)
    }, [])
    const sendEmail = (e) =>{
        e.preventDefault()
        emailjs.sendForm('default_service','template_7gibp1o',refForm.current,'wJkoiUCgHxMBbH2Z4').then(()=>{
            alert("Message sent successfully!")
            window.location.reload(false)
        }),()=>{
            alert("Failed to send Message, Please try again")
        }
    }
    return(
        <>
            <div className="container contact-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters 
                            strArray={['C','o','n','t','a','c','t',' ','M','e']} 
                            idx={15} 
                            letterclass={letterClass} 
                        />
                    </h1>
                    <p>
                         Got a project in mind? Open to collaborating!, Let's connect and discuss how we can bring it to life! Fill out the form and I'll get back to you soon.
                    </p>
                    <div className="contact-form">
                        <form ref={refForm} onSubmit={sendEmail}>
                            <ul>
                                <li className="half">
                                    <input type="text" name="name" placeholder="Name" required />
                                </li>
                                <li className="half">
                                    <input type="email" name="email" placeholder="Email" required />
                                </li>
                                <li>
                                    <input type="text" name="subject" placeholder="Subject" />
                                </li>
                                <li>
                                    <textarea name="message" placeholder="Message" required></textarea>
                                </li>
                                <li>
                                    <input type="submit" className="flat-button" value="SEND" />
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div className="info-map">
                    Aman Shahid,
                    <br />
                    Pakistan,
                    <br />
                    Karachi Central, <br />
                    <span>shahidamaan2019@gmail.com</span>
                </div>
                <div className="map-wrap">
                    <MapContainer center={[44.96366, 19.61045]} zoom={13}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[44.96366, 19.61045]}>
                            <Popup>Aman Lives Here :) </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <Loader type="pacman"/> 
        </>
    )
}

export default Contact