// app/cart/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// Matrix Rain Component
function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -50;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < drops.length; i++) {
                const brightness = Math.random() > 0.5 ? 0.8 : 1;
                ctx.fillStyle = brightness > 0.9 ? '#22d3ee' : '#06b6d4';
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#06b6d4';

                const x = i * 20;
                const y = drops[i] * 20;
                ctx.fillRect(x, y, 3, 3);

                drops[i]++;

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
            }
        };

        const interval = setInterval(draw, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none opacity-40"
        />
    );
}

export default function CartPage() {
    const { cart, removeFromCart, totalPrice } = useCart();
    const [name, setName] = useState("");

    const handleCheckout = () => {
        if (!name.trim()) return alert("Please enter your name!");
        const ownerPhone = "994515978888"; // REPLACE WITH YOUR NUMBER

        let message = `Hello! I want to purchase subscription(s):\n\n`;
        cart.forEach((item) => {
            message += `• ${item.name} (${item.period}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\n💰 *Total Price: $${totalPrice.toFixed(2)}*`;
        message += `\n👤 *Customer Name:* ${name}`;

        const url = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    if (cart.length === 0) {
        return (
            <div className="relative min-h-screen bg-black">
                {/* Grid background */}
                <div className="fixed inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                {/* Matrix Rain */}
                <MatrixRain />

                {/* Scanline overlay */}
                <div className="fixed inset-0 pointer-events-none opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scanline" />
                </div>

                <div className="relative min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
                    <div className="border border-cyan-500/30 p-8 bg-black/50 backdrop-blur-sm mb-6 relative">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                        <ShoppingBag size={48} className="text-cyan-500 mx-auto mb-4" />
                    </div>

                    <h2 className="font-pixel text-2xl font-bold text-white mb-2">CART_EMPTY</h2>
                    <p className="font-mono text-sm text-gray-500 mb-6">{'>'} No items in cart</p>

                    <Link
                        href="/"
                        className="font-mono text-sm bg-cyan-500/10 border border-cyan-500 text-cyan-400 px-6 py-3 hover:bg-cyan-500/20 transition-colors inline-flex items-center gap-2"
                    >
                        BROWSE_CATALOG <ArrowRight size={16} />
                    </Link>
                </div>

                <style jsx>{`
                    @keyframes scanline {
                        0% { transform: translateY(-100%); }
                        100% { transform: translateY(100%); }
                    }
                    .animate-scanline {
                        animation: scanline 8s linear infinite;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <main className="relative min-h-screen bg-black">
            {/* Grid background */}
            <div className="fixed inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Matrix Rain */}
            <MatrixRain />

            {/* Scanline overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-5">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scanline" />
            </div>

            <div className="relative pt-28 pb-12 px-4 max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <div className="inline-block border border-cyan-500/30 px-3 py-1 mb-4">
                            <span className="font-mono text-xs text-cyan-400 tracking-widest">CART_SYSTEM</span>
                        </div>
                        <h1 className="font-pixel text-4xl font-bold text-white">YOUR CART</h1>
                    </div>
                    <div className="font-mono text-xs text-gray-600">
                        ITEMS: <span className="text-cyan-400">{cart.length}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="md:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.cartId} className="group relative bg-black border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 p-4">
                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 flex items-center justify-center text-2xl">
                                            {item.id === "netflix" ? <img src="https://www.pngarts.com/files/1/Netflix-Logo-PNG-Transparent-Image.png" alt="Netflix Logo" className="w-full h-full object-contain" /> :
                                                item.id === "spotify" ? <img src="https://www.pngall.com/wp-content/uploads/9/Spotify-Logo.png" alt="Spotify Logo" className="w-full h-full object-contain" /> :
                                                    item.id === "youtube" ? <img src="https://www.freeiconspng.com/uploads/youtube-logo-play-icon-png-24.png" alt="YouTube Logo" className="w-full h-full object-contain" /> : "🧨"}
                                        </div>
                                        <div>
                                            <h3 className="font-mono text-sm font-bold text-white tracking-wide mb-1">
                                                {item.name.toUpperCase()}
                                            </h3>
                                            <div className="flex gap-2 font-mono text-xs text-gray-500">
                                                <span className="bg-cyan-500/20 border border-cyan-500/30 px-2 py-0.5 text-cyan-400">
                                                    {item.period}
                                                </span>
                                                <span>${item.price.toFixed(2)} × {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-sm font-bold text-cyan-400">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => removeFromCart(item.cartId)}
                                            className="p-2 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-500 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Hover line effect */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </div>
                        ))}
                    </div>

                    {/* Checkout Panel */}
                    <div className="relative bg-black border border-cyan-500/30 p-6 h-fit md:sticky md:top-24">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                        <h3 className="font-mono text-lg font-bold text-white mb-6 tracking-wide">CHECKOUT</h3>

                        <div className="space-y-3 mb-6 pb-6 border-b border-cyan-500/20">
                            <div className="flex justify-between items-baseline font-mono text-xs">
                                <span className="text-gray-600">SUBTOTAL:</span>
                                <span className="text-gray-400">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-baseline font-mono">
                                <span className="text-white font-bold">TOTAL:</span>
                                <span className="text-2xl font-bold text-cyan-400">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-mono text-xs text-gray-600 mb-2 tracking-wider">
                                    CUSTOMER_NAME:
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-black border border-cyan-500/30 focus:border-cyan-500 p-3 text-white font-mono text-sm outline-none transition-colors"
                                />
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-cyan-500/10 border-2 border-cyan-500 hover:bg-cyan-500/20 text-cyan-400 font-mono text-sm font-bold py-3 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                            >
                                PAY_VIA_WHATSAPP <ArrowRight size={16} />
                            </button>

                            <div className="pt-4 border-t border-cyan-500/20">
                                <div className="font-mono text-xs text-gray-600 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-green-400" />
                                        <span>SECURE_PAYMENT</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-green-400" />
                                        <span>INSTANT_DELIVERY</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scanline {
                    animation: scanline 8s linear infinite;
                }
            `}</style>
        </main>
    );
}