
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useDispatch,useSelector } from 'react-redux';
import { setWeather } from '../slice/WeatherSlice';
import "./WeatherApp.css";

const API_KEY = 'e6d9f3cac0593e8f8de4da7112ed38ef';
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/';

const WeatherApp = () => {
  const [city, setCity] = useState('Patna');
  const [forecast,setForcast] = useState(null)
  const [favorites, setFavorites] = useState([]);

  const dispatch = useDispatch();
  const weatherData = useSelector((state)=>state.weatherDatas);
  
  const fetchWeatherDataByCity = async (city) => {
    try {
      const currentWeatherResponse = await axios.get(
        `${API_ENDPOINT}weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `${API_ENDPOINT}forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      dispatch(setWeather(currentWeatherResponse.data));

      setForcast(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherDataByCity(city);
  }, [city]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const addToFavorites = () => {
    if (weatherData && !favorites.some(fav => fav.name === weatherData.name)) {
    setFavorites(prevFavorites => [...prevFavorites, weatherData]);
    }
    };
    
    const removeFromFavorites = (name) => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.name !== name));
    };
    console.log(favorites);

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

      {Object.keys(weatherData).length>0 && (
        <div className="weather-info">
          <div className='weather-info-upper'>
            <h2>Current Weather</h2>
            <button onClick={addToFavorites}>❤️</button>
          </div>
          <div className='inner_weather-info'>
            <p>City: {weatherData.name}</p>
            <p>Temperature: {weatherData?.main?.temp}°C</p>
            <p>Description: {weatherData?.weather[0]?.description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div> 
        </div>
      )}
      <div className='forcast_header'>
        <h2 className='h222'>5-Day Forecast</h2>
      </div>

      {forecast && (
        <div className="forecast-info" >
          {forecast.list.slice(0, 28).map((item, index) => (
            <div className="forecast-item" key={index}>
              <p>Date: {item.dt_txt}</p>
              <p>Temperature: {item.main.temp}°C</p>
              <p>Desc: {item.weather[0].description}</p>
              <p>Wind Speed: {item.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      )}

      <div className='favorites'>
        <div className="fav_name">
            <h2>Favorites</h2>
        </div>
        {favorites.length === 0 && <p>No favorite locations added.</p>}
        {favorites.map((fav, index) => (
          <div className="favorite-item" key={index}>
            <div className='fav_lists'>
              <p>Place Name:{fav.name}</p>
              <p>Feel's like:{fav?.main?.feels_like}</p>
              <p>Humidity:{fav?.main?.humidity}</p>
              <p>Main:{fav?.weather[0]?.main}</p>
              <p>Wind:{fav?.wind?.speed}</p>
            </div>
            
            <button onClick={() => removeFromFavorites(fav.name)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
