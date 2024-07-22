import { useRef } from 'react';
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import "./index.scss";

const Home = () => {
    const form = useRef()

    const submitPortfolio = (e) => {
        e.preventDefault();
        const name = form.current[0]?.value;
        const description = form.current[1]?.value;
        const url = form.current[2]?.value;
        const image = form.current[3]?.files[0];

        const storageRef = ref(storage, `portfolio/${image.name}`);

        uploadBytes(storageRef, image).then(
            (snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    savePortfolio({
                        name,
                        description,
                        url,
                        image: downloadUrl
                    })
                }, (error) => {
                    console.log(error);
                    savePortfolio({
                        name,
                        description,
                        url,
                        image: null
                    })
                })
            }, (error) => {
                console.log(error);
                savePortfolio({
                    name,
                    description,
                    url,
                    image: null
                })
            }
        )
    }

    const savePortfolio = async (portfolio) => {
    
        portfolio.timestamp = serverTimestamp()

        try {
            await addDoc(collection(db, 'portfolio'), portfolio);
            window.location.reload(false);
        } catch (error) {
            alert('Failed to add portfolio');
        }
    }

  return (
    <div className="dashboard">
        <h1 className="heading-dashboard">Enter Details of your latest Project</h1>

        <form className="dashboard-form" ref={form} onSubmit={submitPortfolio}>
            <p><input className="input-element" type="text" placeholder="Name" /></p>
            <p><textarea className="input-textarea" placeholder="Description" /></p>
            <p><input className="input-element" type="text" placeholder="Url" /></p>
            <p><label><input className="input-file" type="file" placeholder="Image" /></label></p>
            <button className="flat-button" type="submit">Submit</button>
            <button className="flat-button b2" onClick={() => auth.signOut()}>Sign out</button>
        </form>
    </div>
  )
}

export default Home