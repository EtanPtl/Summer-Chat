import React from 'react'
import { useState } from 'react';
import './Register.css'
import add from '../img/add-avatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../Firebase.js"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {

    const [err,setErr] = useState(false);
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
         
            uploadTask.on('state_changed',
                (error) => {
                    setErr(true);
                },
                () => {  
                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                            
                        })
                    });
                }
            );

        

        } catch(err){
            setErr(true);
        }
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
                <p>You have an account? Login</p>


            </div>
                
                

            
        </div>

    )
    
}

export default Register