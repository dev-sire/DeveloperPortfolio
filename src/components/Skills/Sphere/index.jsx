import "./index.scss"
import { useEffect, useRef, useState } from 'react';

const TagCloud = () => {
    const canvasRef = useRef(null);
    const tagsRef = useRef(null);
    const [errorState, setErrorState] = useState(null); // State to hold potential error

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

    useEffect(() => {
        if (window.TagCanvas) {
            try {
                window.TagCanvas.Start(
                    canvasRef.current.id,
                    tagsRef.current.id,
                    tagCanvasOptions
                );
                setErrorState(null);
            } catch (e) {
                console.error('TagCanvas error:', e);
                setErrorState(e.message || e.toString());
                if (canvasRef.current) {
                    canvasRef.current.parentElement.style.display = 'none';
                }
            }
        } else {
            console.warn('TagCanvas not found. Make sure tagcanvas.min.js is loaded.');
            setErrorState(new Error('TagCanvas script not loaded.')); // Example
        }

        // return () => {
        //     if (canvasRef.current && window.TagCanvas) {
        //         window.TagCanvas.Stop(canvasRef.current.id);
        //     }
        // };
    }, [tagCanvasOptions, myTags]);

    return (
        <>
            {errorState && (
                <p style={{ color: 'red' }}>Error: {errorState}</p>
            )}
            <div className="skills-chart">
                <div id="myCanvasContainer">
                    <canvas ref={canvasRef} width="500" height="500" id="myCanvas">
                        
                    </canvas>
                </div>
                <div id="tags" ref={tagsRef} style={{ display: 'none' }}>
                    <ul>
                        {myTags.map((tag, index) => (
                            <li key={index}>
                                <a href={tag.href} target={tag.target || '_blank'}>
                                    {tag.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TagCloud;