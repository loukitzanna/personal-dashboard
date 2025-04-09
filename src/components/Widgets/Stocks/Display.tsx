import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STOCKS } from '~/graphql/queries';
import { formatDate } from '~utils/dates';
import { useStocksContext } from './StocksContext';
import { Button, ButtonGroup, Spinner } from '@heroui/react';
import Chart from './Chart';
import WarningMessage from '~ui/WarningMessage';
import ErrorMessage from '~ui/ErrorMessage';

const mockStockData = {
    price: 178.72,
    change: 2.36,
    changePercent: 1.34,
    timestamp: new Date().toISOString(),
    historical: Array(30)
        .fill(0)
        .map((_, i) => ({
            price: 160 + Math.random() * 30,
            timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
        })),
};

const timeRanges = ['1D', '1W', '1M'];

const DisplayView = () => {
    const { selectedStock, timeRange, setTimeRange } = useStocksContext();
    const { loading, error, data } = useQuery(GET_STOCKS, {
        variables: { symbol: selectedStock?.symbol, timeRange },
    });

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!data?.stocks) return <WarningMessage message='No weather data available' />;

    const stockData = data.stocks;

    return (
        <div className='p-4 flex flex-col items-center justify-center gap-5'>
            <h3 className='text-lg font-medium'>{selectedStock?.name}</h3>

            <Chart stockData={stockData} timeRange={timeRange} isPriceUp={stockData.change > 0} />

            <div>
                <ButtonGroup>
                    {timeRanges.map((range) => (
                        <Button
                            color={timeRange === range ? 'secondary' : 'default'}
                            key={range}
                            onPress={() => setTimeRange(range)}
                        >
                            {range}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
};

export default DisplayView;
