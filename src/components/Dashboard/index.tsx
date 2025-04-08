import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WeatherWidget from '../Widgets/Weather';

interface Widget {
    id: string;
    type: 'weather';
    location: string;
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
        { id: 'weather-1', type: 'weather', location: 'New York', gridPos: { x: 0, y: 0, w: 2, h: 2 } }
    ]);

    const updateWidgetSettings = (id: string, settings: WidgetSettings) => {
        setWidgets(widgets.map(widget =>
            widget.id === id ? { ...widget, ...settings } : widget
        ));
    };

    const renderWidget = (widget: Widget) => {
        switch (widget.type) {
            case 'weather':
                return <WeatherWidget key={widget.id} />;
            default:
                return null;
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="max-w-7xl mx-auto p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                    {widgets.map(renderWidget)}
                </div>
            </div>
        </DndProvider>
    );
};

export default Dashboard;