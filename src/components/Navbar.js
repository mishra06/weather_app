import React from 'react'
import { NavLink } from 'react-router-dom'
import weather from "../assets/weather.png"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='navbar_cont'>
      <div className="navbar_sec">
          <div className="right_sec_logo">
            <img src={weather} alt="logo" />
          </div>
          <div className="left_sec_pages">
            <span><NavLink to="/home">Home</NavLink></span>
            <span><NavLink to="/fav">Favourite</NavLink></span>
          </div>
      </div>
    </div>
  )
}

export default Navbar
