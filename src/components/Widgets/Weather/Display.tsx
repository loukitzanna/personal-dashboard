import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from '@heroui/react';
import { GET_WEATHER } from '~/graphql/queries';
import { formatDate } from '~utils/dates';
import ErrorMessage from '~ui/ErrorMessage';
import WarningMessage from '~ui/WarningMessage';
import { useWeatherContext } from './WeatherContext';

const DisplayView = () => {
    const { location, units, showForecast } = useWeatherContext();
    const { loading, error, data } = useQuery(GET_WEATHER, {
        variables: { location, units },
    });

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!data?.weather) return <WarningMessage message='No weather data available' />;

    const { weather } = data;
    const { temperature, condition, humidity, windSpeed, forecast } = weather;

    // TODO: add a background gradient based on the weather condition
    // bg-linear-to-r from-cyan-500 to-blue-500

    return (
        <div className='p-4 '>
            <div className='mb-4'>
                <h2 className='text-xl font-bold'>{weather.location}</h2>
                <p className='text-2xl'>
                    {temperature}°{units === 'metric' ? 'C' : 'F'}
                </p>
                <p className='text-gray-600'>{condition}</p>
                <p className='text-sm text-gray-500'>
                    Humidity: {humidity}% | Wind: {windSpeed} {units === 'metric' ? 'km' : 'mi'}/h
                </p>
            </div>

            {showForecast && (
                <div className='mb-4'>
                    <h3 className='font-semibold mb-2'>Forecast</h3>
                    <div className='grid grid-cols-3 gap-2'>
                        {forecast?.map((day) => (
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
