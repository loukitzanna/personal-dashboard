import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WEATHER } from '~/graphql/queries';
import { formatDate } from '~utils/dates';
import { useWeatherContext } from './WeatherContext';

const DisplayView = () => {
    const { location, units, showForecast } = useWeatherContext();
    console.log(location, units, showForecast);
    const { loading, error, data } = useQuery(GET_WEATHER, {
        variables: { location, units },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data?.getWeather) return <p>No weather data available</p>;

    const { getWeather } = data;

    // TODO: add a background gradient based on the weather condition
    // bg-linear-to-r from-cyan-500 to-blue-500

    return (
        <div className='p-4 '>
            <div className='mb-4'>
                <h2 className='text-xl font-bold'>{getWeather.location}</h2>
                <p className='text-2xl'>
                    {getWeather.temperature}°{units === 'metric' ? 'C' : 'F'}
                </p>
                <p className='text-gray-600'>{getWeather.condition}</p>
                <p className='text-sm text-gray-500'>
                    Humidity: {getWeather.humidity}% | Wind: {getWeather.windSpeed} {units === 'metric' ? 'km' : 'mi'}/h
                </p>
            </div>

            {showForecast && (
                <div className='mb-4'>
                    <h3 className='font-semibold mb-2'>Forecast</h3>
                    <div className='grid grid-cols-3 gap-2'>
                        {getWeather.forecast?.map((day) => (
                            <div key={day.date} className='p-2 border rounded'>
                                <p className='text-sm'>{formatDate(day.date)}</p>
                                <p className='text-lg'>
                                    {day.minTemp}° - {day.maxTemp}°
                                </p>
                                <p className='text-sm text-gray-600'>{day.condition}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayView;
