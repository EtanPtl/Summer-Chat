import React from 'react'

const Navbar = () => {
    return (
        <div className='navbar'>
            <span className='logo'>Summer Chat</span>
            <div className='user'>
                <img className='image' src="https://media.licdn.com/dms/image/D5603AQFa2BTpJAUHYA/profile-displayphoto-shrink_200_200/0/1710986838956?e=1721260800&v=beta&t=ETtdvaob45utcnrREq2c6IBAjbLgIGI4kx35u5px0Zs" alt="" />
                <span>Name</span>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Navbar