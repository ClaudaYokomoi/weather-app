import React, { useEffect, useState } from 'react';
import { BackgroundLayout, WeatherCard, WeatherInfo, SearchBar, MiniCard } from './components';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('Nairobi'); // Default location

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=30bd7797c66d5554ce9fa4e047f55d24`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  return (
    <BackgroundLayout>
      <div className="app-container">
        <SearchBar setLocation={setLocation} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <div className="weather-layout">
            {/* WeatherCard on the left */}
            <WeatherCard
              temperature={weatherData.main.temp}
              windspeed={weatherData.wind.speed}
              humidity={weatherData.main.humidity}
              place={weatherData.name}
              heatIndex={weatherData.main.feels_like}
              iconString={weatherData.weather[0].description}
              conditions={weatherData.weather[0].main}
            />

            {/* MiniCards on the right */}
            <div className="mini-cards-container">
              {weatherData.hourly.map((hour, index) => (
                <MiniCard
                  key={index}
                  time={hour.dt}
                  temp={hour.temp}
                  iconString={hour.weather[0].description}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </BackgroundLayout>
  );
};

export default App;
