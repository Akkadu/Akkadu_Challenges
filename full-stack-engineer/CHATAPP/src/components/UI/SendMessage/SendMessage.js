import React, { useState } from 'react'
import { db } from '../../../config/firebase'
import firebase from 'firebase'
import SendButton from '../Buttons/SendButton'

function SendMessage({ scroll,roomId }) {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        await db.collection(`${roomId}Chats`).add({
            text: msg,
            username: localStorage.getItem("username"),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    
    return (
        <div>
            <div className="sendMsg d-flex justify-content-center">
                <input className="form-control mx-2" style={{ width: '78%', fontSize: '15px', fontWeight: '550' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                <SendButton handleClick={sendMessage}/>
            </div>
        </div>
    )
}

export default SendMessage
