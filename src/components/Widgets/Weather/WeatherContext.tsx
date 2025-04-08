// WeatherContext.jsx
import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext({
    location: 'New York',
    units: 'metric',
    showForecast: true,
    setLocation: (location: string) => {},
    setUnits: (units: string) => {},
    setShowForecast: (showForecast: boolean) => {},
});

export const useWeatherContext = () => useContext(WeatherContext);

export const WeatherProvider = ({ children, initialLocation = 'New York' }) => {
    const [location, setLocation] = useState(initialLocation);
    const [units, setUnits] = useState('metric'); // celsius by default
    const [showForecast, setShowForecast] = useState(true);

    const value = {
        location,
        setLocation,
        units,
        setUnits,
        showForecast,
        setShowForecast,
    };
    return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};
