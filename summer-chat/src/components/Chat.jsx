import React from 'react'
import Add from '../img/add-avatar.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from  './Input'
import '../pages/Home.css'

const Chat = () => {
    return (
        <div className='chat'>
            <div className='chatInfo'>
                <span>Etan</span>
                <div className='chatIcons'>
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat