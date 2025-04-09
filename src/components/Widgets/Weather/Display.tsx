import React from 'react';
import { useQuery } from '@apollo/client';
import client from '~graphql/client';
import { GET_WEATHER } from '~/graphql/queries';
import { useWeatherContext } from './WeatherContext';
import { Button } from '@heroui/react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

const DisplayView = () => {
    const { location } = useWeatherContext();
    const { loading, error, data } = useQuery(GET_WEATHER, {
        variables: { location },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data?.getWeather) return <p>No weather data available</p>;

    const { getWeather } = data;

    const refetch = () => {
        client.refetchQueries({ include: [GET_WEATHER] });
    };

    return (
        <div className='p-4'>
            <div className='mb-4'>
                <h2 className='text-xl font-bold'>{getWeather.location}</h2>
                <p className='text-2xl'>{getWeather.temperature}°C</p>
                <p className='text-gray-600'>{getWeather.condition}</p>
                <p className='text-sm text-gray-500'>
                    Humidity: {getWeather.humidity}% | Wind: {getWeather.windSpeed} km/h
                </p>
            </div>

            <div className='mb-4'>
                <h3 className='font-semibold mb-2'>Forecast</h3>
                <div className='grid grid-cols-3 gap-2'>
                    {getWeather.forecast?.map((day) => (
                        <div key={day.date} className='p-2 border rounded'>
                            <p className='text-sm'>{day.date}</p>
                            <p className='text-lg'>
                                {day.minTemp}° - {day.maxTemp}°
                            </p>
                            <p className='text-sm text-gray-600'>{day.condition}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Button onPress={refetch} className='mt-4'>
                <ArrowUturnLeftIcon className='w-5 h-5' />
                Refresh
            </Button>
        </div>
    );
};

export default DisplayView;
