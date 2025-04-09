declare module 'finnhub' {
    export class FinnhubClient {
        constructor(config: { apiKey: string });

        quote(symbol: string): Promise<{
            c: number; // current price
            d: number; // change
            dp: number; // percent change
        }>;

        stockCandles(
            symbol: string,
            resolution: string,
            from: number,
            to: number
        ): Promise<{
            t: number[]; // timestamps
            c: number[]; // close prices
        }>;
    }
}
