import React from 'react'
import './Register.css'
import add from '../img/add-avatar.png'

const Register = () => {
    return (
        <div className='background-center'>
            <div className='register-container'>
                <h2 className="title">Sign Up</h2>
                <form className='register-form'>
                    <input type='text' placeholder='Username'/>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Password'/>
                    <input style={{display:'none'}} type="file" id='file'/>
                    <label htmlFor='file'>
                        <img src={add} alt="" />
                        <p>Add profile image</p>
                    </label>
                    <button>Register</button>
                </form>
                <p>You have an account? Login</p>


            </div>
                
                

            
        </div>

    )
    
}

export default Register