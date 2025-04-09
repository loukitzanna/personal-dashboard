// StocksContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useDashboardContext } from '~components/Dashboard/DashboardContext';

const widgetId = 'stocks';

const defaultState = {
    // TODO: add default state
    selectedStock: {
        name: 'Apple',
        symbol: 'AAPL',
    },
    timeRange: '1M',
    setTimeRange: () => {},
    setSelectedStock: () => {},
};

const savedState = JSON.parse(localStorage.getItem(widgetId) || '{}');

console.log(savedState);

const StocksContext = createContext({ ...defaultState, ...savedState });

export const useStocksContext = () => useContext(StocksContext);

export const StocksProvider = ({ children }) => {
    const initialState = { ...defaultState, ...savedState };
    const { saveWidgetSettings } = useDashboardContext();

    const [selectedStock, setSelectedStock] = useState(initialState.selectedStock);
    const [timeRange, setTimeRange] = useState(initialState.timeRange);

    const updateSettings = (updateState, stateKey, value) => {
        updateState(value);
        saveWidgetSettings(widgetId, {
            selectedStock,
            timeRange,
            [stateKey]: value,
        });
    };

    const value = {
        selectedStock,
        ssetSelectedStock: (selectedStock) => updateSettings(setSelectedStock, 'selectedStock', selectedStock),
        timeRange,
        setTimeRange: (timeRange) => updateSettings(setTimeRange, 'timeRange', timeRange),
    };
    return <StocksContext.Provider value={value}>{children}</StocksContext.Provider>;
};
