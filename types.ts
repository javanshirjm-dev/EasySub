// types.ts
export type SubscriptionPeriod = "Monthly" | "6 Months" | "Yearly";

export interface Product {
    id: string;
    name: string;
    basePrice: number; // Changed from 'price' to 'basePrice'
    image: string;
    description: string;
    color: string;
}

export interface CartItem extends Product {
    cartId: string; // Unique ID (productId + period) to separate variations
    quantity: number;
    period: SubscriptionPeriod;
    price: number; // The specific price for that period
}