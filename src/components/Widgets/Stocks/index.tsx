import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Divider } from '@heroui/react';
import { ArrowUturnLeftIcon, ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import client from '~graphql/client';
import { GET_STOCKS } from '~graphql/queries';
import DisplayView from './Display';
import Settings from './Settings';
import { useStocksContext, StocksProvider } from './StocksContext';

// view types
type View = 'display' | 'settings';

const StocksWidget = () => {
    const [view, setView] = useState<View>('display');
    const context = useStocksContext();

    const refetch = () => {
        client.refetchQueries({ include: [GET_STOCKS] });
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
                    <h1 className='text-xl font-bold mb-2'>Stocks</h1>
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
            <CardBody>{view === 'display' ? <DisplayView /> : <Settings />}</CardBody>
        </Card>
    );
};

export default () => (
    <StocksProvider>
        <StocksWidget />
    </StocksProvider>
);
