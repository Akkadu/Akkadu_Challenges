import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase'
import SendMessage from '../UI/SendMessage/SendMessage'
import Header from '../UI/Header/Header'

function Chat() {
    const scroll = useRef()
    const { id } = useParams();

    const [messages, setMessages] = useState([])

    useEffect(() => {
        db.collection(`${id}Chats`).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [id])

    console.log(messages)
    return (
        <div>
            <Header />
            <div className="msgs">

                {messages && messages.map(({ text, username,createdAt},i) => (
                    <div key={i}>
                        <div className={` d-flex flex-column justify-content-center msg px-4 my-3 mx-2 rounded ${username === localStorage.getItem('username') ? 'sent bg-dark text-white' : 'received text-white bg-success'}`}>
                            <span><strong>{username}</strong></span>
                            <span>{text}</span>
                            <span><em>{createdAt?.toDate().toUTCString()}</em></span>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage roomId={id} scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat
