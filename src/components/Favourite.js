import React from 'react'
import { useSelector }  from 'react-redux';
import Navbar from './Navbar';
import "./Favourite.css";

const Favrouts = () => {

  const weatherData = useSelector((state)=>state.weatherDatas);
  return (
    <div className="Fav">
      <Navbar/>
      {Object.keys(weatherData).length>0 && (
        <div className="Fav_cont">
          <div className='Fav-info-upper'>
            <h2>Current Weather</h2>
          </div>
          <div className='inner_weather-info Fav_info_lower'>
            <p>City: {weatherData.name}</p>
            <p>Temperature: {weatherData?.main?.temp}°C</p>
            <p>Humidity:{weatherData?.main?.humidity}°C</p>
            <p>Feels_like: {weatherData?.main?.feels_like}°C</p>
            <p>Description: {weatherData?.weather[0]?.description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div> 
        </div>
      )}
    </div>
  )
}

export default Favrouts
