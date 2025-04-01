import React from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  background-color: #f0f0f0;

`;

interface WeatherWidgetProps {
    location: string;
}

const WeatherWidget = ({ location }: WeatherWidgetProps) => {
    return (
        <WeatherContainer>
            <h1>Weather Widget</h1>
            <p>Location: {location}</p>
        </WeatherContainer>
    );
};

export default WeatherWidget;