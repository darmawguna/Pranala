import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { WeddingInfo } from "@/types";



interface Guest {
    name: string;
}

interface Props {
    guest: Guest;
    wedding: WeddingInfo;
    onOpen: () => void;
}

export default function CoverSection({ guest, wedding, onOpen }: Props) {
    const [isOpening, setIsOpening] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const handleOpen = () => {
        setIsOpening(true);
        setTimeout(() => {
            onOpen();
        }, 100);
        setTimeout(() => {
            setIsHidden(true);
        }, 9000);
    };

    if (isHidden) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">


            {/* --- LAYOUT BACKGROUND SPLIT DIAGONAL --- */}

            {/* 1. LAYER SAGE (KANAN ATAS) */}
            {/* Clip path memotong membentuk segitiga siku-siku di kanan atas */}
            <div
                className={`absolute inset-0 bg-[#A39F86] transition-transform duration-[15000ms] ease-in-out z-10
                ${isOpening ? "translate-x-full -translate-y-full" : "translate-x-0 translate-y-0"}`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
            >
                {/* Wayang Kanan Atas */}
                <div className="absolute top-2 right-3 w-50 h-52 opacity-80">
                    <img
                        src="/images/semaraCover.webp"
                        alt="Wayang"
                        className="w-full h-full object-contain drop-shadow-md"
                        onError={(e) =>
                            (e.currentTarget.style.display = "none")
                        }
                    />
                </div>
            </div>

            {/* 2. LAYER COKELAT (KIRI BAWAH) */}
            {/* Clip path memotong membentuk segitiga siku-siku di kiri bawah */}
            <div
                className={`absolute inset-0 bg-[#462e29] transition-transform duration-[15000ms] ease-in-out z-10
                ${isOpening ? "-translate-x-full translate-y-full" : "translate-x-0 translate-y-0"}`}
                style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
            >
                {/* Wayang Kiri Bawah */}
                <div className="absolute bottom-4 left-[-10px] w-50 h-52 opacity-80">
                    <img
                        src="/images/ratihCover.webp"
                        alt="Wayang"
                        className="w-full h-full object-contain drop-shadow-md"
                        onError={(e) =>
                            (e.currentTarget.style.display = "none")
                        }
                    />
                </div>
            </div>

            {/* --- KONTEN TENGAH (TEXT & BUTTON) --- */}
            {/* Z-Index 20 agar berada di atas background */}
            <div
                className={`relative z-20 w-full h-full flex flex-col justify-between py-16 px-6 transition-opacity duration-[15000ms]
                ${isOpening ? "opacity-0" : "opacity-100"}`}
            >
                {/* BAGIAN ATAS (Di area Sage/Krem) */}
                <div className="mt-12 text-center space-y-2">
                    <p className="font-bali text-xl text-white drop-shadow-sm">
                        Keluarga
                    </p>
                    <div className="font-bali text-2xl sm:text-3xl text-white font-bold leading-relaxed drop-shadow-md">
                        <p>I Made Agus Susila</p>
                        <p>I Ketut Agus Dharmawan, ST</p>
                        <p className="text-xl">&</p>
                        <p>I Wayan Urip Sentosa</p>
                    </div>
                </div>

                {/* WATERMARK TENGAH (Opsional) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10 pointer-events-none">
                    <img
                        src="/images/terataiCover.webp"
                        alt="Wayang"
                        className="w-full h-full object-contain drop-shadow-md"
                        onError={(e) =>
                            (e.currentTarget.style.display = "none")
                        }
                    />
                </div>

                {/* BAGIAN BAWAH (Di area Cokelat) */}
                <div className="mb-12 text-center relative">
                    <p className="font-sans text-sm text-white/90 mb-2">
                        Kepada Bapak/Ibu/Saudara/i
                    </p>

                    {/* Nama Tamu */}
                    <h1 className="font-bali text-3xl sm:text-4xl text-white font-bold mb-8 drop-shadow-md">
                        {guest.name}
                    </h1>

                    {/* Button Putih seperti desain */}
                    <div className="flex justify-center">
                        <Button
                            onClick={handleOpen}
                            className="bg-gradient-to-b from-white to-gray-200 hover:to-white text-black font-bold font-bali text-lg px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105"
                        >
                            Buka Undangan
                        </Button>
                    </div>

                    <p className="mt-6 text-xs text-white/70 italic">
                        Mohon maaf apabila ada
                        <br />
                        kesalahan penulisan nama/gelar
                    </p>
                </div>
            </div>
        </div>
    );
}
