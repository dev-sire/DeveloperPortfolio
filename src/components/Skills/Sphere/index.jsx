import "./index.scss"
import { useEffect } from "react"
import TagCloud from "TagCloud";

const Sphere = () => {
    let screen = window.innerWidth, radius;
    if(screen < 1200){
      radius = 150
    }
    else if(screen > 1200 && screen < 2000){
      radius = 300
    }
    else{
      radius = 400
    }
    useEffect(() => {
          const container = ".tagcloud";
          const texts = [
            "HTML5",
            "CSS3",
            "TailwindCSS",
            "JavaScript",
            "ReactJS",
            "NodeJS",
            "JDBC",
            "RouterV8",
            "SQlite",
            "Python",
            "Java",
            "Jswing",
            "Github",
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