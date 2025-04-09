import * as z from 'zod';

// Define Zod schemas
export const ForecastDaySchema = z.object({
  date: z.string(),
  minTemp: z.number(),
  maxTemp: z.number(),
  condition: z.string(),
  icon: z.string().optional()
});

export const WeatherDataSchema = z.object({
  location: z.string(),
  temperature: z.number(),
  condition: z.string(),
  icon: z.string().optional(),
  humidity: z.number().int().optional(),
  windSpeed: z.number().optional(),
  forecast: z.array(ForecastDaySchema)
});

// External API response schema
export const WeatherAPIResponseSchema = z.object({
  location: z.object({
    name: z.string()
  }),
  current: z.object({
    temp_c: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string()
    }),
    humidity: z.number(),
    wind_kph: z.number()
  }),
  forecast: z.object({
    forecastday: z.array(z.object({
      date: z.string(),
      day: z.object({
        mintemp_c: z.number(),
        maxtemp_c: z.number(),
        condition: z.object({
          text: z.string(),
          icon: z.string()
        })
      })
    }))
  })
});
