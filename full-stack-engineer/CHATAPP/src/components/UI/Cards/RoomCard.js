import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinButton from "../Buttons/JoinButton";

function RoomCard({title}) {
    const [username, setUsername] = useState("")
    const [Error, setError] = useState("")

    let Navigate = useNavigate();

    function JoinRoom(e) {
      e.preventDefault()
      if(username === ""){
        setError("Username Cannot Be Empty")
      }
      else{
          localStorage.setItem("username",username)
          setError("")
          Navigate(`/chat/${title}`)
        }
    }

  return (
    <div className="card text-center mx-2" style={{ width: "18rem" }}>
      <img src={`https://source.unsplash.com/300x300/?${title}`} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <input className="form-control" type="text" placeholder="Please Enter Username" onChange={(e)=>setUsername(e.target.value)}/>
        <JoinButton handleClick={JoinRoom}/>
        <br/>
        <hr/>
        <span className="text-danger">{Error}</span>
      </div>
    </div>
  );
}

export default RoomCard;
