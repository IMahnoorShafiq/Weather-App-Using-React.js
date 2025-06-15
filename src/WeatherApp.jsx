

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from './weatherSlice';

function WeatherApp() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeatherData(city));
    }
  };

  const renderForecast = () => {
    const forecastPerDay = weather.weatherData.list
      .filter((item, index) => index % 8 === 0)
      .slice(0, 5);

    return forecastPerDay.map((forecast, index) => {
      const date = new Date(forecast.dt_txt);
      const day = date.toLocaleDateString(undefined, { weekday: 'short' });
      const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      const temp = forecast.main.temp;
      const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

      return (
        <div key={index} className="bg-[rgba(239,181,241,0.6)] p-2 rounded-lg text-center mx-1 transform transition-transform hover:translate-y-[-5px]">
          <h3>{day} <br></br>{time}</h3>
          <img className="w-12 h-12" src={icon} alt="Weather Icon" />
          <p>{temp}°C</p>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen flex justify-center h-full w-full items-center bg-gradient-to-br from-[#a8edea] to-[#fed6e3] text-gray-800">
      <div className="text-center bg-[#ebd7f5] text-[#4e3c6d] p-5 rounded-lg shadow-lg animate-fadeIn">
        <h1 className="text-2xl mb-5">Weatherist</h1>
        <div className="mb-5">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 border border-gray-300 rounded w-48"
            placeholder="Enter city name"
          />
          <button onClick={handleSearch} className="p-2 ml-2 bg-[#4e3c6d] text-white rounded hover:bg-[#3a2c53] transition-colors duration-300">
            Search
          </button>
        </div>
        <div className="flex flex-col items-center animate-fadeInUp">
          {weather.status === 'error' && <div style={{ color: 'rgb(247, 91, 91)', display: 'block' }}>{weather.error}</div>}
          {weather.status === 'fulfilled' && weather.weatherData && (
            <div className="mb-5">
              <h2>{weather.weatherData.city.name}</h2>
              <p>{weather.weatherData.list[0].main.temp}°C</p>
              <p>{weather.weatherData.list[0].weather[0].description}</p>
              <img className="w-20 h-20" src={`https://openweathermap.org/img/wn/${weather.weatherData.list[0].weather[0].icon}@2x.png`} alt="Weather Icon" />
            </div>
          )}
          {weather.status === 'pending' && <div>Loading...</div>}
          <div className="flex flex-col sm:flex-row sm:justify-around w-full items-center">
            {weather.status === 'fulfilled' && renderForecast()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
