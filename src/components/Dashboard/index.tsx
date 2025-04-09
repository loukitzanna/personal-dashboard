import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DashboardProvider } from './DashboardContext';
import WeatherWidget from '../Widgets/Weather';
import StocksWidget from '../Widgets/Stocks';
import TasksWidget from '../Widgets/Tasks';
interface Widget {
    id: string;
    type: string;
    gridPos: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}

interface WidgetSettings {
    location?: string;
    gridPos?: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}

const Dashboard = () => {
    const [widgets, setWidgets] = useState<Widget[]>([
        { id: 'weather-1', type: 'weather', gridPos: { x: 0, y: 0, w: 2, h: 2 } },
        { id: 'stocks-1', type: 'stocks', gridPos: { x: 0, y: 0, w: 2, h: 1 } },
        { id: 'tasks', type: 'tasks', gridPos: { x: 0, y: 0, w: 2, h: 1 } },
    ]);

    const updateWidgetSettings = (id: string, settings: WidgetSettings) => {
        setWidgets(widgets.map((widget) => (widget.id === id ? { ...widget, ...settings } : widget)));
    };

    const renderWidget = (widget: Widget) => {
        switch (widget.type) {
            case 'weather':
                return <WeatherWidget key={widget.id} />;
            case 'stocks':
                return <StocksWidget key={widget.id} />;
            case 'tasks':
                return <TasksWidget key={widget.id} />;
            default:
                return null;
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <DashboardProvider>
                <div className='max-w-7xl mx-auto p-5'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
                        {widgets.map(renderWidget)}
                    </div>
                </div>
            </DashboardProvider>
        </DndProvider>
    );
};

export default Dashboard;
