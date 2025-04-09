import { gql } from '@apollo/client';

export const GET_WEATHER = gql`
    query GetWeather($location: String!, $units: String!) {
        weather(location: $location, units: $units) {
            location
            temperature
            condition
            icon
            humidity
            windSpeed
            description
            forecast {
                date
                minTemp
                maxTemp
                condition
                icon
            }
        }
    }
`;
