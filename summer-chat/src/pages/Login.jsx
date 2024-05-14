import React from 'react'
import './Register.css'
import add from '../img/add-avatar.png'

const Login = () => {
    return (
        <div className='background-center'>
            <div className='register-container'>
                <h2 className="title">Sign Up</h2>
                <form className='register-form'>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Password'/>
                    <button>Sign in</button>
                </form>
                <p>You don't have an account? Register</p>


            </div>
                
                

            
        </div>

    )
    
}

export default Login