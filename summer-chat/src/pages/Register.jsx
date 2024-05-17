import React from 'react'
import { useState } from 'react';
import './Register.css'
import add from '../img/add-avatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../Firebase.js"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const [err,setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);


            // Register three observers:
         
            uploadTask.on(
                "state_changed",
                (snapshot) => {

                },
                (error) => {
                    setErr(true);
                },
                async () => {

                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateProfile(res.user, {
                        displayName: displayName,
                        photoURL: downloadURL
                    });

                    navigate('/');


                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });

                    await setDoc(doc(db, "userChats", res.user.uid), {});
                 

                });

        }
        catch (err) {
            setErr(true);
        };      
           
        } 
    


    return (
        <div className='background-center'>
            <div className='register-container'>
                <h2 className="title">Sign Up</h2>
                <form className='register-form' onSubmit={handleSubmit}>
                    <input type='text' placeholder='Username'/>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Password'/>
                    <input style={{display:'none'}} type="file" id='file'/>
                    <label htmlFor='file'>
                        <img src={add} alt="" />
                        <p>Add profile image</p>
                    </label>
                    <button>Register</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You have an account? <Link to='/login'> Login </Link></p>


            </div>
                
                

            
        </div>

    )
    
}

export default Register