import React from 'react'
import { useSelector }  from 'react-redux';

const Favrouts = () => {

  const weatherData = useSelector((state)=>state.weatherDatas);
  return (
    <div>
      {Object.keys(weatherData).length>0 && (
        <div className="weather-info">
          <div className='weather-info-upper'>
            <h2>Current Weather</h2>
          </div>
          <div className='inner_weather-info'>
            <p>City: {weatherData.name}</p>
            <p>Temperature: {weatherData?.main?.temp}°C</p>
            <p>Description: {weatherData?.weather[0]?.description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div> 
        </div>
      )}
    </div>
  )
}

export default Favrouts
