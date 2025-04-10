import { GraphQLError } from 'graphql';
import { QueryResolvers } from '../generated/graphql.js';
import finnhub from 'finnhub';
import { finnhubClient } from '../config.js';

const transformer = (
    quote: finnhub.QuoteData,
    historical: /*finnhub.CandleData */ { price: number; timestamp: string }[],
    market: finnhub.MarketStatusData
) => {
    return {
        open: quote.o,
        price: quote.c,
        change: quote.d,
        changePercent: quote.dp,
        timestamp: quote.t,
        historical: historical.map(({ price, timestamp }) => ({
            price,
            timestamp,
        })),
        marketIsOpen: market.isOpen,
        marketSession: market.session,
    };
};
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

        try {
            //     // Get current stock quote
            const quote = await new Promise<finnhub.QuoteData>((resolve, reject) => {
                finnhubClient.quote(symbol, (error: Error, data: finnhub.QuoteData) => {
                    if (error) reject(error);
                    else resolve(data);
                });
            });

            //     // Calculate time range for historical data
            //     const end = Math.floor(Date.now() / 1000);
            //     let start: number;
            //     switch (timeRange) {
            //         case '1D':
            //             start = end - 24 * 60 * 60;
            //             break;
            //         case '1W':
            //             start = end - 7 * 24 * 60 * 60;
            //             break;
            //         case '1M':
            //             start = end - 30 * 24 * 60 * 60;
            //             break;
            //         default:
            //             start = end - 30 * 24 * 60 * 60; // Default to 1 month
            //     }

            //     // Get historical data
            //     const historical = await new Promise<finnhub.CandleData>((resolve, reject) => {
            //         finnhubClient.stockCandles(symbol, 'D', start, end, (error: Error, data: finnhub.CandleData) => {
            //             if (error) reject(error);
            //             else resolve(data);
            //         });
            //     });

            const market = await new Promise<any>((resolve, reject) => {
                finnhubClient.marketStatus('US', (error: Error, data: any) => {
                    if (error) reject(error);
                    else resolve(data);
                });
            });

            console.log('🌊', market);

            return transformer(quote, historical, market);
        } catch (error) {
            console.error('Error fetching stock data:', error);
            throw new GraphQLError('Failed to fetch stock data');
        }
    },
};

export default stocksResolver;
