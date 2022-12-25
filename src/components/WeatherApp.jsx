
import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm.jsx';
import WeatherCard from './WeatherCard.jsx';

const key = "wVPzX8srA9tMALsE3u81CYyGM9u4S0UP";

const getWeather = async (id) => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
}

const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
}

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets: cityDets,
    weather: weather
  };
}

const WeatherApp = () => {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [iconSrc, setIconSrc] = useState('');
  const [timeSrc, setTimeSrc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateCity();
    const data = await updateCity(city);
    setWeatherData(data);
    const weather = data.weather;
    setIconSrc(`img/icons/${weather.WeatherIcon}.svg`);
    setTimeSrc(weather.IsDayTime ? "img/day.svg" : "img/night.svg");
  };

  useEffect(() => {
    if (localStorage.getItem("city")) {
      updateCity(localStorage.getItem("city"))
        .then(data => setWeatherData(data))
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <div className="container my-5 mx-auto">
      <h1 className="text-muted text-center my-4">Weather App</h1>
      <SearchForm city={city} setCity={setCity} handleSubmit={handleSubmit} />
      {weatherData ? (
        <WeatherCard city={weatherData.cityDets} weather={weatherData.weather} iconSrc={iconSrc} timeSrc={timeSrc} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WeatherApp;
