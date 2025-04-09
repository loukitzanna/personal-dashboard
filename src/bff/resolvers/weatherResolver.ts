import { QueryResolvers, Weather } from '../generated/graphql.js';

export const weatherResolver: QueryResolvers = {
    Query: {
        getWeather: async (_parent: unknown, { location }: { location: string }) => {
            // TODO: Implement actual weather API call
            const mockData: Weather = {
                location: location,
                temperature: 22.5,
                condition: "Partly cloudy",
                icon: "partly-cloudy",
                humidity: 65,
                windSpeed: 12.3,
                description: "Partly cloudy conditions",
                forecast: [
                    { date: "2025-04-01", minTemp: 18, maxTemp: 24, condition: "Sunny", icon: "sunny" },
                    { date: "2025-04-02", minTemp: 17, maxTemp: 26, condition: "Partly cloudy", icon: "partly-cloudy" },
                    { date: "2025-04-03", minTemp: 16, maxTemp: 22, condition: "Rain", icon: "rain" }
                ]
            };

            return mockData;
        }
    }
};

export default weatherResolver;

