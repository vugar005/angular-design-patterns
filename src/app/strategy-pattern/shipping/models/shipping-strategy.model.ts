export interface IShippingStrategy {
    getType: () => string;
    getCost: () => string;
    getEstimatedTime: () => string;
}
