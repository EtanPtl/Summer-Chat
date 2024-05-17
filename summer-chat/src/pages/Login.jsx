import React from 'react'
import './Register.css'
import add from '../img/add-avatar.png'
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase';

const Login = () => {
    
    const [err,setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
      
        try{
           
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        }
        catch (err) {
            setErr(true);
        };      
           
    } 
    
    return (
        <div className='background-center'>
            <div className='register-container'>
                <h2 className="title">Log In</h2>
                <form className='register-form' onSubmit={handleSubmit}>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Password'/>
                    <button>Sign in</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You don't have an account? <Link to='/register'>Register</Link></p>


            </div>
                
        </div>

    )
    
}

export default Login