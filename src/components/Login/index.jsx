import { signInWithGoogle } from "../../firebase";
import "./index.scss"

const Login = () => {
    return (
        <div className="dashboard">
            <h1 className="heading-1">For Dashboard, Sign In With a Registered Gmail</h1>
            <h2 className="heading-2">The Dashboard is added to update the project cards in the portfolio section dynamically using Cloud Firestore from Firebase</h2>
            <button onClick={signInWithGoogle} className="flat-button">
                Sign in with google
            </button>
            
        </div>
    )
}

export default Login;