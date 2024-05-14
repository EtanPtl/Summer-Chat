import React from 'react'


const Search = () => {
    return (
        <div className='search'>
            <div className='searchForm'>
                <input type='text' placeholder='Search for user'/>
            </div>
            <div className='userChat'>
                <img src="https://media.licdn.com/dms/image/D5603AQFa2BTpJAUHYA/profile-displayphoto-shrink_200_200/0/1710986838956?e=1721260800&v=beta&t=ETtdvaob45utcnrREq2c6IBAjbLgIGI4kx35u5px0Zs" alt=""/>
                <div className='userChatInfo'>
                    <span>Etan</span>
                </div>
            </div>
        </div>
    )
}

export default Search