import React, { useState } from 'react';
import { useStocksContext } from './StocksContext';
import { Button, Form, Input, Radio, RadioGroup, Switch } from '@heroui/react';

const availableStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
    { symbol: 'META', name: 'Meta Platforms, Inc.' },
];

const StocksSettings = () => {
    const { setSelectedStock, selectedStock } = useStocksContext();

    return (
        <div className='flex flex-col gap-5'>
            <RadioGroup
                label='Select a stock'
                defaultValue={selectedStock?.symbol}
                onValueChange={(value) => setSelectedStock(value)}
            >
                {availableStocks.map((stock) => (
                    <Radio key={stock.symbol} value={stock.symbol}>
                        {stock.name}
                    </Radio>
                ))}
            </RadioGroup>
        </div>
    );
};

export default StocksSettings;
