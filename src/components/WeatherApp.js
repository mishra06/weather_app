import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import "./WeatherApp.css";

const API_KEY = 'e6d9f3cac0593e8f8de4da7112ed38ef';
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/';

const WeatherApp = () => {
  const [city, setCity] = useState('Patna');  // Default city set to Patna
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);

  const fetchWeatherDataByCity = async (city) => {
    try {
      const currentWeatherResponse = await axios.get(
        `${API_ENDPOINT}weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `${API_ENDPOINT}forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeatherData(currentWeatherResponse.data);
      setForecast(forecastResponse.data);

      console.log('Current Weather Data:', currentWeatherResponse.data);
      console.log('Forecast Data:', forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherDataByCity(city);
  }, [city]);

  const debouncedFetchWeatherData = useCallback(
    debounce((city) => {
      fetchWeatherDataByCity(city);
    }, 1000),
    []
  );

  const handleInputChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    debouncedFetchWeatherData(newCity);
  };

  return (
    <div className="weather-app">
      <div className='upper_part'>
        <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={handleInputChange}
      />
      </div>
      

      {weatherData && (
        <div className="weather-info">
          <div>
            <h2>Current Weather</h2>
          </div>
          <div className='inner_weather-info'>
            <p>City: {weatherData.name}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div> 
        </div>
      )}
      <div>
        <h2>5-Day Forecast</h2>
      </div>

      {forecast && (
        <div className="forecast-info">
          
          {forecast.list.slice(0, 5).map((item, index) => (
            <div className="forecast-item" key={index}>
              <p>Date: {item.dt_txt}</p>
              <p>Temperature: {item.main.temp}°C</p>
              <p>Description: {item.weather[0].description}</p>
              <p>Wind Speed: {item.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
