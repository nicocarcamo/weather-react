
import React, { useState, useEffect } from 'react';

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
      <form className="change-location my-4 text-center text-muted" onSubmit={handleSubmit}>
        <label className="mb-3" for="city">Enter a location for weather information</label>
        <input className="form-control p-2 mb-3" type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {weatherData ? (
        <div class="card shadow-lg rounded">
          <img src={timeSrc} class="time card-img-top" alt="img" />
          <div class="icon bg-light mx-auto text-center">
            <img src={iconSrc} alt="icon" />
          </div>
          <div class="text-muted text-uppercase text-center details">
            <h5 className="my-3">{weatherData.cityDets.EnglishName}, {weatherData.cityDets.Country.EnglishName}</h5>
            <div className="my-3">{weatherData.weather.WeatherText}</div>
            <div className="display-4 my-4">
              <span>{weatherData.weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WeatherApp;


