declare module 'finnhub' {
    export class DefaultApi {
        constructor();
        apiKey: string;

        quote(symbol: string, callback: (error: Error, data: QuoteData) => void): void;

        stockCandles(
            symbol: string,
            resolution: string,
            from: number,
            to: number,
            callback: (error: Error, data: CandleData) => void
        ): void;
    }

    interface QuoteData {
        c: number; // current price
        d: number; // change
        dp: number; // percent change
    }

    interface CandleData {
        t: number[]; // timestamps
        c: number[]; // close prices
    }
}
