import React from 'react'
import { Routes,Route } from "react-router-dom"
import Chat from '../components/Pages/Chat'
import PageNotFound from '../components/Pages/PageNotFound'
import Rooms from '../components/Pages/Rooms'

function Navigation() {
  // let user = localStorage.getItem("username")

  return (
    <Routes>
        <Route path="/chat/:id" element={<Chat/>}/>
        <Route path="/" element={<Rooms />}/>
        <Route path="/*" element={<PageNotFound />}/>
    </Routes>
  )
}

export default Navigation