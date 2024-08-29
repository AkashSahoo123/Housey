import React, { useContext } from 'react'
import "./layout.scss"
import Navbar from '../../components/navbar/Navbar'
import HomePage from '../Homepage/HomePage'
import { Navigate, Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext'

function Layout() {
  return (
    <div className='layout'>
      <Toaster
        position="bottom-left"
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            borderRadius: '10px',
            color: "#fff",
          },
        }}
      />
      <div className='navbar'> <Navbar/></div>
      <div className="content"><Outlet/></div>
    </div>
  )
}

function RequireAuth() {
  const {currentUser} = useContext(AuthContext)

  if(!currentUser) return <Navigate to="/login"/>
  return (
    currentUser && (
    <div className='layout'>
      <Toaster
        position="bottom-left"
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            borderRadius: '10px',
            color: "#fff",
          },
        }}
      />
      <div className='navbar'> <Navbar/></div>
      <div className="content"><Outlet/></div>
    </div>
    )
  )
}

export {Layout,RequireAuth}
