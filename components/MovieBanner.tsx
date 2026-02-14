// components/MovieBannerSimple.tsx
"use client";

import Link from "next/link";

export default function MovieBannerSimple() {
    // Replace this URL with your desired high-quality background image like a movie collage or cinema scene
    const bgImage = "https://t3.ftcdn.net/jpg/05/00/81/96/360_F_500819621_7bRfuKkKyaRYU6aJ1Sa9RBCPdscka6Iq.jpg";

    return (
        <section
            className="relative  mx-auto  min-h-[500px] md:min-h-[600px] bg-cover bg-center flex items-center overflow-hidden"
            style={{ backgroundImage: `url('${bgImage}')` }}
        >
            {/* Dark Overlay: Crucial for making white text readable on top of an image */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full py-16 md:py-24">

                {/* Left Aligned Text Block */}
                <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl mt-20 font-extrabold text-white tracking-tight mb-4 leading-tight drop-shadow-lg">
                        Movies And Shows!
                    </h2>
                    <p className="text-gray-200 text-lg md:text-xl max-w-lg mb-8 leading-relaxed font-medium drop-shadow-md">
                        Get access to top content anytime, anywhere. Join now and enjoy endless entertainment!
                    </p>
                    <Link href="/cart">
                        <button className="bg-cyan-700 hover:bg-cyan-800 text-white border-3 border-cyan-400 font-bold py-3.5 px-10  transition-all transform   text-lg uppercase tracking-wider">
                            Shop Now
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
}