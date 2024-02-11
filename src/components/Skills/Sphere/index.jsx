import "./index.scss"
import { useEffect } from "react"
import TagCloud from "TagCloud";

const Sphere = () => {
    let screen = window.innerWidth;
    let radius = screen < 1200 ? 150 : 300
    useEffect(() => {
          const container = ".tagcloud";
          const texts = [
            "HTML",
            "CSS",
            "TailwindCSS",
            "JavaScript",
            "React",
            "NodeJS",
            "routerV8",
            "ES7",
            "Python",
            "C++",
            "GITHUB",
          ];
          const options = {
            radius: radius,
            maxSpeed: "fast",
            initSpeed: "fast",
          };
          TagCloud(container, texts, options);
      }, []);
  return (
    <>
      <div className="text-shpere">
        <span className="tagcloud"></span>
      </div>  
    </>
  )
}
export default Sphere