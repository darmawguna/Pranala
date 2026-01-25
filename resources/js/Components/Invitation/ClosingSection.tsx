import { WeddingInfo } from "@/types";

interface Props {
    wedding: WeddingInfo;
}

export default function ClosingSection({ wedding }: Props) {
    return (
        <div className="relative w-full min-h-screen py-20 px-4 bg-[#F4F1EA] text-[#462e29] font-serif overflow-hidden flex flex-col items-center justify-center">

            {/* ========== BACKGROUND LAYERS ========== */}

            {/* Wayang Left */}
            <img
                src="/images/wayang-bg-left.webp"
                alt="Wayang Left"
                className="absolute top-1/2 z-10 -translate-y-1/2 left-[-25%] sm:left-[-25%] md:left-[25%] h-[50vh] md:h-[70vh] w-auto object-contain opacity-30 pointer-events-none"
                onError={(e) => (e.currentTarget.style.display = "none")}
            />

            {/* Wayang Right */}
            <img
                src="/images/wayang-bg-right.webp"
                alt="Wayang Right"
                className="absolute top-1/2 z-10 -translate-y-1/2 right-[-25%] sm:right-[-25%] md:right-[25%] h-[50vh] md:h-[70vh] w-auto object-contain opacity-30 pointer-events-none"
                onError={(e) => (e.currentTarget.style.display = "none")}
            />

            {/* Lotus Watermark - Centered */}
            <div className="absolute inset-0 w-full h-full z-20 pointer-events-none flex items-center justify-center">
                <img
                    src="/images/lotus-watermark.webp"
                    alt="Lotus Watermark"
                    className="w-[60%] max-w-[450px] h-auto object-contain opacity-[0.8]"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
            </div>

            {/* Bottom Border */}
            <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
                <img
                    src="/images/bottom.webp"
                    alt="Bottom Border"
                    className="w-full h-auto object-contain opacity-90"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
            </div>

            {/* ========== CONTENT ========== */}
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8 px-4">

                {/* Quote from Scripture */}
                {wedding.quote_text && (
                    <div className="space-y-2">
                        <p className="text-sm italic leading-relaxed opacity-80">
                            "{wedding.quote_text}"
                        </p>
                        <p className="text-xs opacity-60 font-sans">
                            — Bhagavad Gita  —
                        </p>
                    </div>
                )}

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 py-2">
                    <div className="h-[2px] w-12 bg-gradient-to-l from-[#462e29] to-transparent"></div>
                    <div className="h-2 w-2 rotate-45 bg-[#462e29]"></div>
                    <div className="h-[2px] w-12 bg-gradient-to-r from-[#462e29] to-transparent"></div>
                </div>

                {/* Closing Message */}
                <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                    <p>
                        Merupakan suatu kehormatan dan kebahagiaan bagi kami,
                        apabila Bapak/Ibu/Saudara/i berkenan hadir untuk
                        memberikan doa kepada putra dan putri kami.
                    </p>
                    <p className="font-medium">
                        Atas doa dan kehadirannya kami ucapkan terima kasih.
                    </p>
                </div>

                {/* Om Shanti */}
                <div className="space-y-3 pt-6">
                    <p className="text-xl sm:text-2xl italic font-serif">
                        Om Shanti, Shanti, Shanti Om
                    </p>
                    <div className="text-3xl sm:text-4xl font-bali leading-relaxed tracking-wide">
                        ᬒᬁᬰᬵᬦ᭄ᬢᬶᬂᬰᬵᬦ᭄ᬢᬶᬂᬰᬵᬦ᭄ᬢᬶᬑᬁ
                    </div>
                </div>

                {/* Family Signature */}
                <div className="pt-8 text-sm opacity-80">
                    <p>Kami yang berbahagia,</p>
                    <p className="font-semibold mt-1">
                        Keluarga {wedding.bride_short_name || "Mempelai"} & {wedding.groom_short_name || "Mempelai"}
                    </p>
                </div>
            </div>
        </div>
    );
}
