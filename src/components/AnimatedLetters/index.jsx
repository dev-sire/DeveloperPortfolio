import './index.scss'

const AnimatedLetters = ({letterclass, strArray, idx})=>{
    return(
        <span>
            {
                strArray.map((char, i) => (
                    <span key={char + i} className={`${letterclass} _${i + idx}`}>
                        {char}
                    </span>
                ))
            }
        </span>
    )
}
export default AnimatedLetters