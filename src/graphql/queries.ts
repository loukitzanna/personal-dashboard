import { gql } from '@apollo/client';

export const GET_WEATHER = gql`
  query GetWeather($location: String!) {
    getWeather(location: $location) {
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