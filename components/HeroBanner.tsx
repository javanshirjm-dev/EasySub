// components/HeroBannerLarge.tsx
"use client";

import { useState, useEffect } from "react";
import { Zap, TrendingUp, Shield, Clock, Star, Package } from "lucide-react";

const banners = [
    {
        id: 1,
        icon: Zap,
        title: "FLASH_OFFER",
        subtitle: "Limited Time Deal",
        message: "Save up to 17% on annual plans",
        cta: "CLAIM_NOW",
        gradient: "from-cyan-500/20 to-blue-500/20",
        accentColor: "cyan",
    },
    {
        id: 2,
        icon: Shield,
        title: "SECURE_PLATFORM",
        subtitle: "Enterprise Grade Security",
        message: "Military-grade encryption • Instant activation",
        cta: "LEARN_MORE",
        gradient: "from-green-500/20 to-emerald-500/20",
        accentColor: "green",
    },
    {
        id: 3,
        icon: Star,
        title: "PREMIUM_SERVICE",
        subtitle: "Rated 4.9/5 Stars",
        message: "Join 10,000+ satisfied customers worldwide",
        cta: "VIEW_REVIEWS",
        gradient: "from-purple-500/20 to-pink-500/20",
        accentColor: "purple",
    },
    {
        id: 4,
        icon: Package,
        title: "INSTANT_DELIVERY",
        subtitle: "Automated System",
        message: "Receive your subscription within seconds",
        cta: "GET_STARTED",
        gradient: "from-cyan-500/20 to-teal-500/20",
        accentColor: "cyan",
    },
];

export default function HeroBannerLarge() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % banners.length);
                setIsTransitioning(false);
            }, 400);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentBanner = banners[currentIndex];
    const Icon = currentBanner.icon;

    const getAccentClass = (color: string) => {
        switch (color) {
            case 'green':
                return 'border-green-500 text-green-400 bg-green-500/10';
            case 'purple':
                return 'border-purple-500 text-purple-400 bg-purple-500/10';
            default:
                return 'border-cyan-500 text-cyan-400 bg-cyan-500/10';
        }
    };

    return (
        <div className="relative w-full bg-black border border-cyan-500/30 overflow-hidden mb-16">
            {/* Large corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 z-10" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 z-10" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 z-10" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 z-10" />

            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${currentBanner.gradient} transition-all duration-500`} />

            {/* Scan lines */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-scan-vertical" />
            </div>

            {/* Content */}
            <div className="relative max-w-6xl mx-auto px-6 py-8 md:py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Icon + Content */}
                    <div className="flex items-start gap-6">
                        {/* Large animated icon */}
                        <div className={`w-16 h-16 md:w-20 md:h-20 border-2 ${getAccentClass(currentBanner.accentColor)} flex items-center justify-center transition-all duration-500 ${isTransitioning ? 'scale-50 opacity-0 rotate-180' : 'scale-100 opacity-100 rotate-0'
                            }`}>
                            <Icon size={32} className="md:w-10 md:h-10" />
                        </div>

                        {/* Text content */}
                        <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                            }`}>
                            <div className="font-mono text-xs text-gray-600 tracking-widest mb-1">
                                {currentBanner.subtitle}
                            </div>
                            <h2 className="font-pixel text-2xl md:text-3xl font-bold text-white mb-2">
                                {currentBanner.title}
                            </h2>
                            <p className="font-mono text-sm md:text-base text-gray-400 max-w-md">
                                {currentBanner.message}
                            </p>
                        </div>
                    </div>

                    {/* Right: CTA + Progress */}
                    <div className="flex flex-col items-center md:items-end gap-4">


                        {/* Progress indicators */}
                        <div className="flex gap-2">
                            {banners.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsTransitioning(true);
                                        setTimeout(() => {
                                            setCurrentIndex(index);
                                            setIsTransitioning(false);
                                        }, 400);
                                    }}
                                    className="group relative"
                                >
                                    {/* Progress bar background */}
                                    <div className="w-12 h-1 bg-cyan-500/20 border border-cyan-500/30" />
                                    {/* Active progress bar */}
                                    {index === currentIndex && (
                                        <div className="absolute inset-0 bg-cyan-500 border border-cyan-400 animate-progress origin-left" />
                                    )}
                                    {/* Completed indicator */}
                                    {index < currentIndex && (
                                        <div className="absolute inset-0 bg-cyan-500/50 border border-cyan-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

            <style jsx>{`
        @keyframes scan-vertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-scan-vertical {
          animation: scan-vertical 4s linear infinite;
        }

        .animate-progress {
          animation: progress 5s linear;
        }
      `}</style>
        </div>
    );
}