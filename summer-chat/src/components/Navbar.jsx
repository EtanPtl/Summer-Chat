import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../Firebase.js'
import { AuthContext } from '../context/AuthContext.js'
import { useContext } from 'react'

const Navbar = () => {

    const {currentUser} = useContext(AuthContext);

    return (
        <div className='navbar'>
            <span className='logo'>Summer Chat</span>
            <div className='user'>
                <img className='image' src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar