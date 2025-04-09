import { QueryResolvers } from '../generated/graphql.js';

export const stocksResolver: QueryResolvers = {
    stocks: async (_parent: unknown, { symbol, timeRange }: { symbol: string; timeRange: string }) => {
        // Generate mock historical data
        const now = Date.now();
        const historical = Array.from({ length: 30 }, (_, i) => {
            const timestamp = new Date(now - (29 - i) * 24 * 60 * 60 * 1000);
            const basePrice = 100;
            const randomChange = (Math.random() - 0.5) * 10;
            return {
                price: basePrice + randomChange,
                timestamp: timestamp.toISOString(),
            };
        });

        return {
            price: historical[historical.length - 1].price,
            change: historical[historical.length - 1].price - historical[0].price,
            changePercent:
                ((historical[historical.length - 1].price - historical[0].price) / historical[0].price) * 100,
            timestamp: new Date().toISOString(),
            historical,
        };
    },
};

export default stocksResolver;
