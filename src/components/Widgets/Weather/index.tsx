import React, { useState } from 'react';
import DisplayView from './Display';
import WeatherSettings from './Settings';
import { Button, Card, CardHeader, CardBody, Divider, CardFooter } from '@heroui/react';
import { ArrowUturnLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useWeatherContext, WeatherProvider } from './WeatherContext';

// view types
type View = 'display' | 'settings';

const WeatherWidget = () => {
    const [view, setView] = useState<View>('settings');
    const context = useWeatherContext();

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
                    <h1 className='text-xl font-bold mb-2'>Weather Widget</h1>
                    <Button size='sm' isIconOnly onPress={handleViewChange}>
                        {view === 'display' ? (
                            <Cog6ToothIcon className='h-[20px]' />
                        ) : (
                            <ArrowUturnLeftIcon className='h-[20px]' />
                        )}
                    </Button>
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
