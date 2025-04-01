export const weatherResolver = {
    Query: {
        weather: async (_: any, { location }: { location: string }) => {
            // TODO: Implement actual weather API call
            return {
                temperature: 20,
                description: "Sunny",
                location: location
            };
        }
    }
}; 