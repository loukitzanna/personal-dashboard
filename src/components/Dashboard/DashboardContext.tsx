import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext({
    widgets: [],
    // setWidgets: (widgets: any[]) => {},
    saveWidgetSettings: (widgetId: string, settings: any) => {},
    getWidgetSettings: (widgetId: string) => {},
});

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
    // const [widgets, setWidgets] = useState([]);

    const saveWidgetSettings = (widgetId: string, settings: any) => {
        // save to localstorage
        localStorage.setItem(widgetId, JSON.stringify(settings));
    };

    const getWidgetSettings = (widgetId: string) => {
        // get from localstorage
        return JSON.parse(localStorage.getItem(widgetId) || '{}');
    };

    return (
        <DashboardContext.Provider value={{ widgets: [], saveWidgetSettings, getWidgetSettings }}>
            {children}
        </DashboardContext.Provider>
    );
};
