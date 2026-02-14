// components/Navbar.tsx
"use client";

import Link from "next/link";
import { ShoppingCart, Zap, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { totalItems } = useCart();
    const { searchQuery, setSearchQuery } = useSearch();
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-cyan-500/30">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400" />

            {/* Main Container: Changed h-16 to min-h-16 and added wrapping for mobile */}
            <div className="max-w-6xl mx-auto px-4 min-h-16 py-3 md:py-0 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3">

                {/* Left: Logo + System Status */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative w-8 h-8 bg-cyan-500 border border-cyan-400">
                                <div className="absolute inset-1 bg-black" />
                                <Zap size={16} className="absolute inset-0 m-auto text-cyan-500" />
                            </div>
                        </div>
                        <span className="font-mono text-base tracking-widest text-cyan-400 group-hover:text-cyan-300 transition-colors font-bold">
                            EASYSUB
                        </span>
                    </Link>

                    {/* Status hidden on small mobile, visible on tablet+ */}
                    <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-gray-600 border-l border-cyan-500/20 pl-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-400 animate-pulse" />
                            <span>ONLINE</span>
                        </div>
                        <span className="text-cyan-500/50">|</span>
                        <span>{time}</span>
                    </div>
                </div>

                {/* Right: Cart (Moved up in code to ensure it stays on top row with Logo on mobile) */}
                {/* We use order properties to position elements visually */}
                <div className="flex items-center order-2 md:order-3">
                    <Link href="/cart" className="relative group">
                        <div className="relative p-2.5 border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-200">
                            <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ShoppingCart size={18} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        </div>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-xs font-mono font-bold w-5 h-5 flex items-center justify-center border border-cyan-400 shadow-lg shadow-cyan-500/50 animate-pulse-slow">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Center: Search Bar */}
                {/* Mobile: Order-last (bottom row), w-full. Desktop: Order-2 (middle), flex-1 */}
                <div className="order-3 md:order-2 w-full md:w-auto md:flex-1 md:mx-8 max-w-full md:max-w-2xl">
                    <div className="relative w-full group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-cyan-500/40 group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH_DATABASE..."
                            className="w-full bg-black/40 border border-cyan-500/20 text-cyan-100 text-xs font-mono py-2.5 pl-9 pr-3 focus:outline-none focus:border-cyan-500/60 focus:bg-cyan-950/10 placeholder-cyan-500/30 transition-all uppercase tracking-wider rounded-none"
                        />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/30 group-focus-within:border-cyan-400 transition-colors" />
                    </div>
                </div>
            </div>

            {/* Scanlines */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                <div className="h-full w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-horizontal" />
            </div>

            <style jsx>{`
                @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
                @keyframes scan-horizontal { 0% { transform: translateX(-100%); } 100% { transform: translateX(500%); } }
                .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
                .animate-scan-horizontal { animation: scan-horizontal 3s linear infinite; }
            `}</style>
        </nav>
    );
}