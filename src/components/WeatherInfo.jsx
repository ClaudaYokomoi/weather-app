import React, { useState, useEffect } from 'react';
import { WeatherCard, MiniCard } from './index'; // Import WeatherCard and MiniCard
import SearchBar from './SearchBar'; // Import SearchBar

const WeatherInfo = () => {
  const [location, setLocation] = useState('Nairobi'); // Default location
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(60000); // Set interval to 1 minute (60,000 ms)

  // Function to fetch current weather data
  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');

    try {
      const weatherResponse = await fetch(
       url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${30bd7797c66d5554ce9fa4e047f55d24}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error(`Error: ${weatherResponse.status} - ${weatherResponse.statusText}`);
      }

      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      // Fetch forecast data
      const forecastResponse = await fetch(
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=30bd7797c66d5554ce9fa4e047f55d24`
      if (!forecastResponse.ok) {
        throw new Error(`Error: ${forecastResponse.status} - ${forecastResponse.statusText}`);
      }

      const forecastData = await forecastResponse.json();
      setForecastData(forecastData.list); // Assuming you want to display hourly forecast
    } catch (err) {
      console.error(err);
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch the weather data when the component mounts or when location changes
  useEffect(() => {
    fetchWeatherData();

    const intervalId = setInterval(() => {
      fetchWeatherData();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [location, refreshInterval]);

  // Handle location search
  const handleSearch = (newLocation) => {
    setLocation(newLocation);
  };

  const handleRefresh = () => {
    fetchWeatherData(); // Call fetchWeatherData when refresh button is clicked
  };

  const handleIntervalChange = (e) => {
    const value = Number(e.target.value);
    setRefreshInterval(value * 60000); // Convert minutes to milliseconds
  };

  return (
    <div className="weather-info-container">
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={handleSearch} />

        <div className="flex items-center">
          <label className="mr-2">Refresh Interval (minutes):</label>
          <select onChange={handleIntervalChange} className="p-2 border border-gray-300 rounded">
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>

        <button 
          onClick={handleRefresh} 
          className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition"
        >
          Refresh
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-data-container">
          <WeatherCard
            temperature={weatherData.main.temp}
            windspeed={weatherData.wind.speed}
            humidity={weatherData.main.humidity}
            place={weatherData.name}
            heatIndex={weatherData.main.feels_like}
            iconString={weatherData.weather[0].description}
            conditions={weatherData.weather[0].main}
          />
          {/* Display MiniCards for forecast */}
          <div className="mini-cards-container">
            {forecastData.slice(0, 5).map((forecast, index) => ( // Display only the first 5 forecasts
              <MiniCard
                key={index}
                time={forecast.dt_txt}
                temp={forecast.main.temp}
                iconString={forecast.weather[0].description}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
