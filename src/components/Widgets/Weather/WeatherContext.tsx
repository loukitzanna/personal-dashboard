// WeatherContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useDashboardContext } from '~components/Dashboard/DashboardContext';

const widgetId = 'weather';

const defaultState = {
    location: 'New York',
    units: 'metric',
    showForecast: true,
    setLocation: (location: string) => {},
    setUnits: (units: string) => {},
    setShowForecast: (showForecast: boolean) => {},
};

const savedState = JSON.parse(localStorage.getItem(widgetId) || '{}');

console.log(savedState);

const WeatherContext = createContext({ ...defaultState, ...savedState });

export const useWeatherContext = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
    const initialState = { ...defaultState, ...savedState };
    const { saveWidgetSettings } = useDashboardContext();
    const [location, setLocation] = useState(initialState.location);
    const [units, setUnits] = useState(initialState.units); // celsius by default
    const [showForecast, setShowForecast] = useState(initialState.showForecast);

    const updateSettings = (updateState, stateKey, value) => {
        updateState(value);
        saveWidgetSettings(widgetId, { location, units, showForecast, [stateKey]: value });
    };

    const value = {
        location,
        setLocation: (location) => updateSettings(setLocation, 'location', location),
        units,
        setUnits: (units) => updateSettings(setUnits, 'units', units),
        showForecast,
        setShowForecast: (showForecast) => updateSettings(setShowForecast, 'showForecast', showForecast),
    };
    return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};
