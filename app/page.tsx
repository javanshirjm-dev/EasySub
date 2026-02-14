// app/page.tsx
'use client';
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Product } from "@/types";
import { useEffect, useRef } from "react";

const products: Product[] = [
  {
    id: "netflix",
    name: "Netflix Premium",
    basePrice: 15,
    description: "4K Ultra HD Streaming, 4 Screens.",
    image: "/netflix.png",
    color: "bg-red-600",
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    basePrice: 8,
    description: "Ad-free music listening, offline play.",
    image: "/spotify.png",
    color: "bg-green-500",
  },
  {
    id: "canva",
    name: "Canva Pro",
    basePrice: 12,
    description: "Unlimited premium content & tools.",
    image: "/canva.png",
    color: "bg-blue-500",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    basePrice: 10,
    description: "Ad-free videos & background play.",
    image: "/youtube.png",
    color: "bg-red-500",
  },
];

// Matrix Rain Component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain settings
    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = [];

    // Initialize drops with random starting positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50;
    }

    // Animation loop
    const draw = () => {
      // Fade effect for trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cyan pixel dots
      for (let i = 0; i < drops.length; i++) {
        // Pixel dot
        const brightness = Math.random() > 0.5 ? 0.8 : 1;
        ctx.fillStyle = brightness > 0.9 ? '#22d3ee' : '#06b6d4';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#06b6d4';

        // Draw square pixel (more retro than circle)
        const x = i * 20;
        const y = drops[i] * 20;
        ctx.fillRect(x, y, 3, 3);

        // Move drop down
        drops[i]++;

        // Reset drop to top randomly
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
      className="fixed inset-0 pointer-events-none opacity-25"
    />
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Grid background pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Matrix Rain Effect */}
      <MatrixRain />

      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scanline" />
      </div>

      <div className="relative pt-24 pb-16 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block border border-cyan-500/30 px-3 py-1 mb-6">
            <span className="font-mono text-xs text-cyan-400 tracking-widest">SYSTEM_ACTIVE</span>
          </div>

          <h1 className="font-pixel text-4xl md:text-5xl font-black mb-4 tracking-wide">
            <span className="text-white">UPGRADE YOUR</span>
            <br />
            <span className="text-cyan-400">SUBSCRIPTIONS</span>
          </h1>

          <p className="font-mono text-sm text-gray-500 max-w-md">
            {'>'} Access top-tier digital services
            <br />
            {'>'} Competitive pricing // No hidden fees
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Footer />

      </div>

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      `}</style>
    </main>
  );
}