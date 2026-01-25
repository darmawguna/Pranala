import { useEffect, useRef, useState } from "react";

export default function ParticipantSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [headerPosition, setHeaderPosition] = useState<"top" | "bottom">(
        "top"
    );

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Logic:
            // Jika bagian bawah section sudah terlihat di layar (rect.bottom < windowHeight + buffer),
            // Header pindah ke bawah.
            // Buffer 100px agar transisi terjadi sedikit sebelum benar-benar habis.
            // Namun, kita ingin header "menunggu" di bawah.
            // Jadi logika "switch" adalah ketika user mendekati akhir.

            // Jika user scroll ke atas (rect.bottom jauh di bawah), kembali ke top.
            if (rect.bottom < windowHeight + 200) {
                setHeaderPosition("bottom");
            } else {
                setHeaderPosition("top");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const participants = [
        {
            name: "I Gede Damar Arya Airlangga",
            label: "Putra Pertama dari Pasangan",
            parents: [
                "I Ketut Agus Darmawan, ST",
                "Ni Made Mia Indah Sari, SE., Ak",
            ],
        },
        {
            name: "Ni Made Dwi Antari",
            label: "Putri Kedua dari Pasangan",
            parents: [
                "I Ketut Agus Darmawan, ST",
                "Ni Made Mia Indah Sari, SE., Ak",
            ],
        },
        {
            name: "I Nyoman Triyana Artha",
            label: "Putra Ketiga dari Pasangan",
            parents: [
                "I Ketut Agus Darmawan, ST",
                "Ni Made Mia Indah Sari, SE., Ak",
            ],
        },
        {
            name: "Ni Ketut Catur Wulandari",
            label: "Putri Keempat dari Pasangan",
            parents: [
                "I Ketut Agus Darmawan, ST",
                "Ni Made Mia Indah Sari, SE., Ak",
            ],
        },
        {
            name: "I Putu Panca Nugraha",
            label: "Putra Kelima dari Pasangan",
            parents: [
                "I Ketut Agus Darmawan, ST",
                "Ni Made Mia Indah Sari, SE., Ak",
            ],
            isLast: true,
        },
    ];

    return (
        <div ref={sectionRef} className="relative w-full py-16 px-4 min-h-screen flex flex-col justify-center bg-transparent">
            {/* 1. LAYER BACKGROUND (Sticky within ParticipantSection) */}
            <div className="sticky top-0 h-screen w-full z-0 overflow-hidden pointer-events-none">
                {/* Wayang Kiri */}
                <img
                    src="/images/wayang-bg-left.webp"
                    alt="Wayang Left"
                    className="absolute top-1/2 -translate-y-1/2 left-[-20%] sm:left-[-10%] md:left-[2%] h-[60vh] md:h-[80vh] w-auto object-contain opacity-20 transition-all duration-700 ease-out"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
                {/* Wayang Kanan */}
                <img
                    src="/images/wayang-bg-right.webp"
                    alt="Wayang Right"
                    className="absolute top-1/2 -translate-y-1/2 right-[-20%] sm:right-[-10%] md:right-[2%] h-[60vh] md:h-[80vh] w-auto object-contain opacity-20 transition-all duration-700 ease-out"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto w-full">
                {/* DUAL HEADER APPROACH FOR SMOOTH TRANSITION */}

                {/* 1. Top Guardian Header */}
                <div
                    className={`sticky top-20 z-30 text-center mb-20 bg-[#F4F1EA]/80 backdrop-blur-md py-4 rounded-xl shadow-sm border border-[#462e29]/10 transition-opacity duration-500 ease-in-out ${headerPosition === "top"
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                        }`}
                >
                    <h3 className="text-xl font-bold mb-2 text-[#462e29]">
                        Upacara Manusa Yadnya
                    </h3>
                    <p className="text-xs opacity-80 font-sans tracking-[0.2em] uppercase">
                        Putra & Putri Kami
                    </p>
                </div>

                {/* 2. Bottom Escort Header */}
                <div
                    className={`fixed bottom-4 w-[calc(100%-2rem)] max-w-4xl mx-auto bg-[#F4F1EA] text-center py-4 rounded-xl shadow-xl border border-[#462e29]/10 z-50 transition-all duration-500 ease-in-out transform ${headerPosition === "bottom"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-10 pointer-events-none"
                        }`}
                    style={{
                        left: "50%",
                        transform: headerPosition === "bottom" ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)"
                    }}
                >
                    <h3 className="text-xl font-bold mb-2 text-[#462e29]">
                        Upacara Manusa Yadnya
                    </h3>
                    <p className="text-xs opacity-80 font-sans tracking-[0.2em] uppercase">
                        Putra & Putri Kami
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center pb-40">
                    {participants.map((person, index) => {
                        // CASCADING DECK LOGIC
                        // Base Top: 160px (di bawah header)
                        // Offset: 20px per kartu
                        // Result: Kartu 1 @ 160px, Kartu 2 @ 180px, dst.
                        const baseTop = 160;
                        const offset = 20;
                        const stickyTop = baseTop + index * offset;

                        return (
                            <div
                                key={index}
                                className={`sticky w-full max-w-[200px] ${person.isLast ? "md:col-span-2 mb-0" : "mb-[20vh]"} transition-all duration-500`}
                                style={{
                                    top: `${stickyTop}px`, // Dynamic Top
                                    zIndex: index + 10,
                                }}
                            >
                                {/* CARD COMPACT STYLE */}
                                <div className="bg-[#a39f86]/90 backdrop-blur-md border border-[#462e29]/20 rounded-lg p-5 shadow-lg hover:shadow-xl text-center relative overflow-hidden transform transition-transform hover:-translate-y-1 duration-300">
                                    {/* Hiasan Sudut */}
                                    <div className="absolute top-2 right-2 opacity-30 text-[#462e29]">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                                        </svg>
                                    </div>

                                    {/* NAMA */}
                                    <h3 className="font-bali text-xl font-bold text-[#462e29] mb-2 drop-shadow-sm leading-tight min-h-[3rem] flex items-center justify-center">
                                        {person.name}
                                    </h3>

                                    <div className="w-8 h-px bg-[#462e29]/40 mx-auto mb-3"></div>

                                    {/* LABEL */}
                                    <p className="text-[10px] font-sans mb-1 font-bold uppercase tracking-widest text-[#462e29]/70">
                                        {person.label}
                                    </p>

                                    {/* ORANG TUA */}
                                    <div className="font-serif text-sm leading-tight text-[#462e29] mt-2">
                                        <p>{person.parents[0]}</p>
                                        <p className="text-[10px] opacity-60 my-0.5">
                                            &
                                        </p>
                                        <p>{person.parents[1]}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
