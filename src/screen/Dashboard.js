import React from 'react'
import Navbar from '../components/Navbar'
import WeatherApp from '../components/WeatherApp'


const Dashboard = () => {
  return (
    <div style={{display:'flex',flexDirection:"column", overflow:"hidden"}}>
      <div style={{width:"100%" , height:"10vh"}}><Navbar/></div>
      <div style={{width:"100%" , height:"150vh"}}><WeatherApp/></div>
    </div>
  )
}

export default Dashboard
