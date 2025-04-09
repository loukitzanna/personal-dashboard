import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config({ path: join(__dirname, '../../.env') });

// Export environment variables with type safety
export const env = {
    WEATHER_API_URL: process.env.WEATHER_API_URL,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
} as const;

// Validate required environment variables
if (!env.WEATHER_API_URL) {
    throw new Error('WEATHER_API_URL is not defined in environment variables');
}

if (!env.WEATHER_API_KEY) {
    throw new Error('WEATHER_API_KEY is not defined in environment variables');
}
