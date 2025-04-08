import React, { useState } from 'react';
import { useWeatherContext } from './WeatherContext';
import { Button, Form, Input, Switch } from '@heroui/react';
import { FolderIcon } from '@heroicons/react/20/solid';

const WeatherSettings = () => {
    // value true is imperial, false is metric
    const { setUnits, units, setLocation, location } = useWeatherContext();
    const [inputLocation, setInputLocation] = useState(location);

    return (
        <div className='flex flex-col gap-5'>
            <div className='setting-row flex items-center gap-2'>
                <span>Metric (C)</span>
                <Switch
                    size='sm'
                    defaultSelected={units === 'imperial'}
                    aria-label='temperature unis'
                    onValueChange={(value) => {
                        setUnits(value ? 'imperial' : 'metric');
                    }}
                />
                <span>Imperial (F)</span>
            </div>
            <div className='setting-row flex items-center gap-2'>
                <Input
                    label='Location'
                    placeholder='Enter location'
                    value={inputLocation}
                    onChange={(e) => setInputLocation(e.target.value)}
                />
                <Button size='sm' isIconOnly onPress={() => setLocation(inputLocation)}>
                    <FolderIcon className='h-[20px]' />
                </Button>
            </div>
        </div>
    );
};

export default WeatherSettings;
