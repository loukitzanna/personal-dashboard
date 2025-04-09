import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Divider } from '@heroui/react';
import { ArrowUturnLeftIcon, ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import client from '~graphql/client';
import { GET_WEATHER } from '~graphql/queries';
import DisplayView from './Display';
import WeatherSettings from './Settings';
import { useWeatherContext, WeatherProvider } from './WeatherContext';

// view types
type View = 'display' | 'settings';

const WeatherWidget = () => {
    const [view, setView] = useState<View>('display');
    const context = useWeatherContext();

    const refetch = () => {
        client.refetchQueries({ include: [GET_WEATHER] });
    };

    const handleViewChange = () => {
        if (view === 'display') {
            setView('settings');
        } else {
            setView('display');
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between gap-5 w-full'>
                    <h1 className='text-xl font-bold mb-2'>Weather</h1>
                    <div className='flex gap-2'>
                        <Button isIconOnly size='sm' onPress={refetch}>
                            <ArrowPathIcon className='w-5 h-5' />
                        </Button>
                        <Button size='sm' isIconOnly onPress={handleViewChange}>
                            {view === 'display' ? (
                                <Cog6ToothIcon className='w-5 h-5' />
                            ) : (
                                <ArrowUturnLeftIcon className='w-5 h-5' />
                            )}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>{view === 'display' ? <DisplayView /> : <WeatherSettings />}</CardBody>
        </Card>
    );
};

export default () => (
    <WeatherProvider>
        <WeatherWidget />
    </WeatherProvider>
);
