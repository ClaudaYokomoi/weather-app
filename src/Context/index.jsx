// src/context/StateContextProvider.jsx
import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [place, setPlace] = useState('Nairobi');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch weather data
    const fetchWeather = async () => {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Access the API key from .env

        const options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                q: place,
                appid: apiKey,
                units: 'metric' // For Celsius
            },
        };

        setLoading(true);
        setError('');

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setWeather(response.data); // Set the weather data
        } catch (e) {
            console.error(e);
            setError('This place does not exist'); // Set error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(); // Fetch weather whenever 'place' changes
    }, [place]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            loading,
            error
        }}>
            {children}
        </StateContext.Provider>
    );
};
export const useStateContext = () => useContext(StateContext);