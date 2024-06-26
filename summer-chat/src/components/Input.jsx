import React, { useContext, useState } from 'react';
import Img from '../img/attach-img.png';
import Attach from '../img/attach.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../Firebase.js';

const Input = () => {

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);


    //update doc import

    const handleSend = async () => {
        
        if(img){

            const storageRef = ref(storage, uuid());
        
            const uploadTask = uploadBytesResumable(storageRef, img);
            
           
            uploadTask.on(
                "state_changed",
                (snapshot) => {
        
                },
                (error) => {
                    //setErr(true);
                },
                async () => {
                    
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: uuid(),
                            text, 
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img:downloadURL,
                        }),
                    });
                 
        
                });
 
        }else{
           
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text, 
                    senderId: currentUser.uid,
                    date: Timestamp.now(),

                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {text},
            [data.chatId + ".date"] : serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {text},
            [data.chatId + ".date"] : serverTimestamp()
        });

        setText("");
        setImg(null);
    }

    const handleKey = e => {
        e.code === "Enter" && handleSend();
    }

    return (
        <div className='input'>
            <input type='text' placeholder='Type Message...' onChange={e=>setText(e.target.value)} value={text} onKeyDown={handleKey}/>
            <div className='send'>
                <img src={Attach} alt=""/>
                <input type='file' style={{display:"none"}} id='file' onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor='file'>
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input