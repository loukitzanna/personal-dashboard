import { QueryResolvers } from '../generated/graphql.js';

const transformer = (settings: { units: string }, data: any) => {
    const useMetric = settings.units === 'metric';
    // Transform to our schema format
    const transformedData = {
        location: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        description: data.current.condition.text,
        forecast: data.forecast?.forecastday?.map((day: any) => {
            return {
                date: day.date,
                minTemp: useMetric ? day.day.mintemp_c : day.day.mintemp_f,
                maxTemp: useMetric ? day.day.maxtemp_c : day.day.maxtemp_f,
                condition: day.day.condition.text,
                icon: day.day.condition.icon,
            };
        }),
    };

    if (useMetric) {
        transformedData.temperature = data.current.temp_c;
        transformedData.windSpeed = data.current.wind_kph;
    } else {
        transformedData.temperature = data.current.temp_f;
        transformedData.windSpeed = data.current.wind_mph;
    }
    return transformedData;
};

export const weatherResolver: QueryResolvers = {
    Query: {
        weather: async (_parent: unknown, { location, units }: { location: string; units: string }) => {
            try {
                // Use process.env directly since it's loaded at server startup
                const response = await fetch(
                    `${process.env.WEATHER_API_URL}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${location}&days=3`
                );

                if (!response.ok) {
                    throw new Error(`Weather API responded with status: ${response.status}`);
                }

                const data = await response.json();

                return transformer({ units }, data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                throw new Error('Failed to fetch weather data');
            }
        },
    },
};

export default weatherResolver;
