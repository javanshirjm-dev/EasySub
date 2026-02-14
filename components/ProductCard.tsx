// components/ProductCard.tsx
"use client";

import { Product, SubscriptionPeriod } from "@/types";
import { useCart } from "@/context/CartContext";
import { Plus, Check } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [period, setPeriod] = useState<SubscriptionPeriod>("Monthly");
    const [isAdded, setIsAdded] = useState(false);

    // Price Calculation Logic
    const getPrice = (base: number, p: SubscriptionPeriod) => {
        if (p === "6 Months") return base * 5.5;
        if (p === "Yearly") return base * 10;
        return base;
    };

    const getDiscount = (p: SubscriptionPeriod) => {
        if (p === "6 Months") return "-8%";
        if (p === "Yearly") return "-17%";
        return null;
    };

    const currentPrice = getPrice(product.basePrice, period);
    const discount = getDiscount(period);

    const handleAddToCart = () => {
        addToCart(product, period, currentPrice);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <div className="group bg-black border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 relative">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

            <div className="p-6">
                {/* Header section */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {/* Icon box */}
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 flex items-center justify-center text-2xl">
                            {product.id === "netflix" ? <img src="https://www.pngarts.com/files/1/Netflix-Logo-PNG-Transparent-Image.png" alt="Netflix Logo" className="w-full h-full object-contain" /> :
                                product.id === "spotify" ? <img src="https://www.pngall.com/wp-content/uploads/9/Spotify-Logo.png" alt="Spotify Logo" className="w-full h-full object-contain" /> :
                                    product.id === "youtube" ? <img src="https://www.freeiconspng.com/uploads/youtube-logo-play-icon-png-24.png" alt="YouTube Logo" className="w-full h-full object-contain" /> : "🧨"}
                        </div>

                        <div>
                            <h3 className="font-mono text-base font-bold text-white tracking-wide mb-1">
                                {product.name.toUpperCase()}
                            </h3>
                            <p className="font-mono text-xs text-gray-500">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {discount && (
                        <div className="bg-cyan-500 text-black px-2 py-1 font-mono text-xs font-bold">
                            {discount}
                        </div>
                    )}
                </div>

                {/* Period selector */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    {(["Monthly", "6 Months", "Yearly"] as SubscriptionPeriod[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`font-mono text-xs py-2 border transition-all duration-200 ${period === p
                                ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                : "border-gray-800 text-gray-600 hover:border-gray-700 hover:text-gray-400"
                                }`}
                        >
                            {p === "Monthly" ? "1M" : p === "6 Months" ? "6M" : "12M"}
                        </button>
                    ))}
                </div>

                {/* Price and action */}
                <div className="flex items-end justify-between border-t border-cyan-500/20 pt-4">
                    <div>
                        <div className="font-mono text-xs text-gray-600 mb-1">PRICE_{period.toUpperCase().replace(' ', '_')}</div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-mono font-bold text-cyan-400">
                                ${currentPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`font-mono text-xs font-bold px-4 py-2 border transition-all duration-200 ${isAdded
                            ? "bg-green-500/20 border-green-500 text-green-400"
                            : "bg-cyan-500/10 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                            }`}
                    >
                        {isAdded ? (
                            <span className="flex items-center gap-1">
                                <Check size={14} /> ADDED
                            </span>
                        ) : (
                            <span className="flex items-center gap-1">
                                <Plus size={14} /> ADD
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Hover line effect */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
    );
}