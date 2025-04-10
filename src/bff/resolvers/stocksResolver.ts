import { GraphQLError } from 'graphql';
import { QueryResolvers } from '../generated/graphql.js';
import finnhub from 'finnhub';
import { finnhubClient } from '../config.js';

const transformer = (quote: any, historical: any, market: finnhub.MarketStatusData) => {
    return {
        name: quote.data[0].name,
        symbol: quote.data[0].ticker,
        open: quote.data[0].day_open,
        price: quote.data[0].price,
        change: Number((quote.data[0].price - quote.data[0].day_open).toFixed(2)),
        changePercent: quote.data[0].day_change,
        timestamp: quote.data[0].last_trade_time,
        historical: historical.data.map(({ date, data }: { date: string; data: any }) => ({
            price: data.open,
            timestamp: date,
        })),
        marketIsOpen: market.isOpen,
        marketSession: market.session,
    };
};
export const stocksResolver: QueryResolvers = {
    stocks: async (_parent: unknown, { symbol, timeRange }: { symbol: string; timeRange: string }) => {
        // Generate mock historical data
        // const now = Date.now();
        // const historical = Array.from({ length: 30 }, (_, i) => {
        //     const timestamp = new Date(now - (29 - i) * 24 * 60 * 60 * 1000);
        //     const basePrice = 100;
        //     const randomChange = (Math.random() - 0.5) * 10;
        //     return {
        //         price: basePrice + randomChange,
        //         timestamp: timestamp.toISOString(),
        //     };
        // });

        try {
            // Get current stock quote
            const quote = await (
                await fetch(
                    new URL('/v1/data/quote', process.env.STOCKDATA_API_URL).toString() +
                        '?' +
                        new URLSearchParams({
                            api_token: process.env.STOCKDATA_API_KEY as string,
                            symbols: symbol,
                        }).toString()
                )
            ).json();

            const dateRange = {};

            if (timeRange === '1D') {
                // @ts-expect-error
                dateRange.date = new Date().toISOString().split('T')[0];
            } else {
                // Calculate time range for historical data
                let end = Math.floor(Date.now() / 1000);
                let start: number;
                switch (timeRange) {
                    case '1D':
                        start = end - 24 * 60 * 60;
                        break;
                    case '1W':
                        start = end - 7 * 24 * 60 * 60;
                        break;
                    case '1M':
                        start = end - 30 * 24 * 60 * 60;
                        break;
                    default:
                        start = end - 30 * 24 * 60 * 60; // Default to 1 month
                }
                // format date  to YYYY-MM-DD
                const date_from = new Date(start * 1000).toISOString().split('T')[0];
                const date_to = new Date(end * 1000).toISOString().split('T')[0];

                // @ts-expect-error date_from is not defined in the type
                dateRange.date_from = date_from;
                // @ts-expect-error date_to is not defined in the type
                dateRange.date_to = date_to;
            }

            // Get historical data

            console.log('🐱‍🐉', dateRange);

            const historical = await (
                await fetch(
                    new URL('/v1/data/intraday', process.env.STOCKDATA_API_URL).toString() +
                        '?' +
                        new URLSearchParams({
                            api_token: process.env.STOCKDATA_API_KEY as string,
                            symbols: symbol,
                            interval: 'hour',
                            sort: 'asc',
                            ...dateRange,
                        }).toString()
                )
            ).json();

            const market = await new Promise<any>((resolve, reject) => {
                finnhubClient.marketStatus('US', (error: Error, data: any) => {
                    if (error) reject(error);
                    else resolve(data);
                });
            });

            // @ts-ignore
            return transformer(quote, historical, market);
        } catch (error) {
            console.error('Error fetching stock data:', error);
            throw new GraphQLError('Failed to fetch stock data');
        }
    },
};

export default stocksResolver;
