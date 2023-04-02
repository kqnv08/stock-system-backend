import { IPlazo } from "./banza/plazo.interface";

export interface IMarketData {
    Plazo1: IPlazo;
    Plazo0: IPlazo;
    Plazo2: IPlazo;
}

export interface IPrice {
    ticker: string;
    env: string;
    marketData: Partial<IMarketData & IPlazo>;
    last_fetched: string;
}

export interface IPriceHistoryBodyMessage {
    Ticker: string;
    Price: IPrice;
    Fecha: string;
}

export interface IPriceHistoryBody {
    message: IPriceHistoryBodyMessage[];
    page: number;
    totalOfPages: number;
    itemsPerPage: number;
    totalOfItems: number;
    totalOfItemsInSelection: number;
    startItemNumber: number;
    endItemNumber: number;
}
