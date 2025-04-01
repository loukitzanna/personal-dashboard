import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import DashboardGrid from './DashboardGrid';
import WeatherWidget from '../Widgets/Weather';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Dashboard = () => {
    const [widgets, setWidgets] = useState([
        { id: 'weather-1', type: 'weather', location: 'New York', gridPos: { x: 0, y: 0, w: 2, h: 2 } }
    ]);

    const updateWidgetSettings = (id, settings) => {
        setWidgets(widgets.map(widget =>
            widget.id === id ? { ...widget, ...settings } : widget
        ));
    };

    const renderWidget = (widget) => {
        switch (widget.type) {
            case 'weather':
                return <WeatherWidget key={widget.id} widget={widget} updateSettings={updateWidgetSettings} />;
            default:
                return null;
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <DashboardContainer>
                <DashboardGrid>
                    {widgets.map(renderWidget)}
                </DashboardGrid>
            </DashboardContainer>
        </DndProvider>
    );
};

export default Dashboard;