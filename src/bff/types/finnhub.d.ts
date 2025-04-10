declare module 'finnhub' {
    export class ApiClient {
        static instance: {
            authentications: {
                api_key: {
                    apiKey: string;
                };
            };
        };
    }

    export class DefaultApi {
        [x: string]: any;
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

        marketStatus(exchange: string, callback: (error: Error, data: MarketStatusData) => void): void;
    }

    interface QuoteData {
        o: number; // open price
        c: number; // current price
        d: number; // change
        dp: number; // percent change
        t: string; // timestamp
    }

    interface CandleData {
        s: string; // status
        t: number[]; // timestamps
        o: number[]; // open prices
        h: number[]; // high prices
        l: number[]; // low prices
        c: number[]; // close prices
        v: number[]; // volume
    }

    interface MarketStatusData {
        isOpen: boolean;
        session: string;
        t: string; // timestamp
    }
}
