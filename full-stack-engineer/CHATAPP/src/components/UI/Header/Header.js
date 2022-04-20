import React from 'react'
import { useNavigate } from 'react-router-dom'
import LeaveButton from '../Buttons/LeaveButton';

function LeaveRoom() {
    let Navigate = useNavigate();

    let LeaveRoom = ()=>{
        localStorage.setItem("username","")
        Navigate("/")
    }

    return (
        <div className="bg-dark text-white d-flex justify-content-around py-2">
            <h2>CHAT ROOM</h2>
            <LeaveButton handleClick={LeaveRoom}/>
        </div>
    )
}

export default LeaveRoom
