import React, { useState } from 'react';
import './WeatherApp.css';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import humidityIcon from '../Assets/humidity.png';
import rainIcon from '../Assets/rain.png';
import searchIcon from '../Assets/search.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png';

const WeatherApp = () => {
    const [weatherIcon, setWeatherIcon] = useState(cloudIcon);
    const [weatherData, setWeatherData] = useState({
        name: 'City',
        main: { temp: 10, humidity: 60 },
        wind: { speed: 10 },
        weather: [{ icon: '01d' }]
    });
    
    const API_KEY = 'd5ccb3651fd8b7afe2aaa172e0dde270';

    const weatherIcons = {
        '01': clearIcon,
        '02': cloudIcon,
        '03': drizzleIcon,
        '04': drizzleIcon,
        '09': rainIcon,
        '10': rainIcon,
        '13': snowIcon,
    };

    const getWeatherIcon = (iconCode) => {
        const prefix = iconCode.slice(0, 2);
        return weatherIcons[prefix] || clearIcon;
    };

    const search = async () => {
        const cityInput = document.querySelector(".cityInput").value;
        if (!cityInput) {
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
            setWeatherIcon(getWeatherIcon(data.weather[0].icon));
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className="cityInput" placeholder='Search' />
                <div className='search-icon' onClick={search}>
                    <img src={searchIcon} alt="Search" />
                </div>
            </div>

            <div className="weather-image">
                <img src={weatherIcon} alt="Weather" />
            </div>

            {weatherData && (
                <>
                    <div className='weather-temp'>
                        {weatherData.main.temp}°C
                    </div>

                    <div className='weather-location'>
                        {weatherData.name}
                    </div>

                    <div className='data-container'>
                        <div className='element'>
                            <img src={humidityIcon} className='icon' alt='Humidity' />
                            <div className='data'>
                                <div className="humidity-percentage">{weatherData.main.humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>

                        <div className='element'>
                            <img src={windIcon} className='icon' alt='Wind Speed' />
                            <div className='data'>
                                <div className="wind-rate">{weatherData.wind.speed} km/h</div>
                                <div className="text">Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherApp;
