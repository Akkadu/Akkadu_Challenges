import React from 'react'
import RoomCard from '../UI/Cards/RoomCard'

function Rooms() {
  return (
    <div>
        <h2 className="bg-dark text-white w-100 text-center py-3">ROOMS</h2>
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
            <RoomCard title="Gaming"/>           
            <RoomCard title="Cars"/>           
        </div>
    </div>
  )
}

export default Rooms