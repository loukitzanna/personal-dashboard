import React from 'react';
import { useWeatherContext } from './WeatherContext';

const DisplayView = () => {
    const { location } = useWeatherContext();
    return (
        <div>
            <p className="text-gray-700">Location: {location}</p>
        </div>
    );
};

export default DisplayView;
