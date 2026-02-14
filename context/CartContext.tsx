// context/CartContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product, SubscriptionPeriod } from "@/types";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, period: SubscriptionPeriod, price: number) => void;
    removeFromCart: (cartId: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem("easysub_cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("easysub_cart", JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (product: Product, period: SubscriptionPeriod, price: number) => {
        const uniqueCartId = `${product.id}-${period}`;

        setCart((prev) => {
            const existing = prev.find((item) => item.cartId === uniqueCartId);
            if (existing) {
                return prev.map((item) =>
                    item.cartId === uniqueCartId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [
                ...prev,
                { ...product, cartId: uniqueCartId, period, price, quantity: 1 },
            ];
        });
    };

    const removeFromCart = (cartId: string) => {
        setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};