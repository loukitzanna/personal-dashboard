import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import finnhub from 'finnhub';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config({ path: join(__dirname, '../../.env') });

// Export environment variables with type safety
export const env = {
    WEATHER_API_URL: process.env.WEATHER_API_URL,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    STOCKDATA_API_URL: process.env.STOCKDATA_API_URL,
    STOCKDATA_API_KEY: process.env.STOCKDATA_API_KEY,
    FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
} as const;

// Validate required environment variables
if (!env.WEATHER_API_URL) {
    throw new Error('WEATHER_API_URL is not defined in environment variables');
}

if (!env.WEATHER_API_KEY) {
    throw new Error('WEATHER_API_KEY is not defined in environment variables');
}

if (!process.env.FINNHUB_API_KEY) {
    throw new Error('FINNHUB_API_KEY environment variable is not set');
}

// Create a single configured client instance
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = env.FINNHUB_API_KEY as string;
const finnhubClient = new finnhub.DefaultApi();

export { finnhubClient };
