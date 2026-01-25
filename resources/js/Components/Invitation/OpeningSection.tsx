import { useEffect, useState } from "react";
import { WeddingInfo } from "@/types";



interface Props {
    wedding: WeddingInfo;
}

export default function OpeningSection({ wedding }: Props) {
    const [textOpacity, setTextOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Fade out starts at 0, fully faded by 300-400px
            // Math.max(0, ...) ensures transparency doesn't go below 0
            const newOpacity = Math.max(0, 1 - scrollPosition / 400);
            setTextOpacity(newOpacity);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative w-full pt-48 pb-12 px-6">
            {/* Aset Background: Top Border (Tetap tajam, tidak kena opacity) */}
            <div className="absolute top-0 left-0 w-full z-0 pointer-events-none">
                <img
                    src="/images/main-top-border.webp"
                    alt="Top Border Decoration"
                    className="w-full h-auto object-contain opacity-90"
                />
            </div>

            {/* Konten Ucapan (Bisa memudar) */}
            <div
                className="relative z-10 text-center space-y-4 max-w-3xl mx-auto"
                style={{ opacity: textOpacity, transition: "opacity 0.1s ease-out" }}
            >
                <div className="text-4xl font-bold opacity-80 text-[#462e29]">
                    ᬑᬁ
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-bali tracking-wide text-[#462e29]">
                    Om Swastiastu
                </h2>
                <p className="italic text-lg opacity-80 font-serif text-[#462e29]">
                    Om Awignamastu Namo Siddham
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 py-4">
                    <div className="h-[2px] w-12 bg-gradient-to-l from-[#462e29] to-transparent"></div>
                    <div className="h-2 w-2 rotate-45 bg-[#462e29]"></div>
                    <div className="h-[2px] w-12 bg-gradient-to-r from-[#462e29] to-transparent"></div>
                </div>

                {wedding.opening_text && (
                    <p className="text-sm sm:text-base leading-relaxed font-sans font-medium text-[#462e29]/80 px-4">
                        {wedding.opening_text}
                    </p>
                )}
            </div>
        </div>
    );
}
