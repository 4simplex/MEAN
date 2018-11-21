export class Stock {
    _id: string;
    product: { Product };
    provider: { Provider };
    purchasePrice: number;
    salePrice: number;
    stockUnits: number;
    stockCode: string;
}
