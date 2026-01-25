import { useEffect, useState } from "react";
import { WeddingInfo } from "@/types";



interface Props {
    wedding: WeddingInfo;
}

export default function TimeEventSection({ wedding }: Props) {
    // Countdown State
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date("2026-02-14T10:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor(
                        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    ),
                    minutes: Math.floor(
                        (distance % (1000 * 60 * 60)) / (1000 * 60)
                    ),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full py-16 px-4 bg-[#F4F1EA] text-[#462e29] font-serif overflow-hidden">
            {/* Background Images Layer */}

            {/* Mid Ornament - LEFT SIDE (vertical decoration) */}
            <div className="absolute top-0 left-0 h-full z-0 pointer-events-none">
                <img
                    src="/images/mid.webp"
                    alt="Left Decoration"
                    className="h-full w-auto object-contain opacity-40"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
            </div>

            {/* Mid Ornament - RIGHT SIDE (mirrored) */}
            <div className="absolute top-0 right-0 h-full z-0 pointer-events-none scale-x-[-1]">
                <img
                    src="/images/mid.webp"
                    alt="Right Decoration"
                    className="h-full w-auto object-contain opacity-40"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
            </div>

            {/* Lotus Watermark - Centered, more visible */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none flex items-center justify-center">
                <img
                    src="/images/lotus-watermark.webp"
                    alt="Lotus Background"
                    className="w-[50%] max-w-[350px] h-auto object-contain opacity-[0.8]"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
                {/* Header Date */}
                <div className="text-center space-y-2">
                    <p className="font-bold text-lg md:text-xl font-serif">Pada</p>

                    {/* Horizontal Divider / Mid Ornament */}
                    <img
                        src="/images/mid.webp"
                        alt="Divider"
                        className="h-auto w-32 md:w-48 mx-auto opacity-80"
                    />

                    <div className="flex flex-col items-center justify-center">
                        <span className="text-6xl md:text-7xl font-bold font-serif leading-none tracking-tight">
                            14
                        </span>
                        <span className="text-3xl md:text-4xl italic font-serif mt-2">
                            Februari 2026
                        </span>
                    </div>
                </div>

                {/* Horizontal Divider Line (Optional visual separation before grid) */}
                <div className="w-full h-px bg-[#462e29]/20 my-4 max-w-xs mx-auto md:hidden"></div>

                {/* Content Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center mt-8">
                    {/* Left: Address */}
                    <div className="text-center md:text-right space-y-2 px-4">
                        <h3 className="font-bold text-lg leading-relaxed">
                            {wedding.venue_address ||
                                "Jln. Ir. Sutami, Br. Medahan, Desa Kemenuh, Sukawati, Gianyar"}
                        </h3>
                    </div>

                    {/* Center: Divider */}
                    <div className="hidden md:block w-px h-full min-h-[100px] bg-[#462e29] mx-auto"></div>

                    {/* Right: Time & Countdown */}
                    <div className="flex flex-col items-center md:items-start space-y-4 px-4 text-center md:text-left">
                        <p className="font-bold text-lg">
                            Pukul 16.00 Wita/selesai
                        </p>

                        {/* Countdown Grid */}
                        <div className="grid grid-cols-4 gap-2">
                            <CountdownBox value={timeLeft.days} label="DAYS" />
                            <CountdownBox value={timeLeft.hours} label="HRS" />
                            <CountdownBox value={timeLeft.minutes} label="MINS" />
                            <CountdownBox value={timeLeft.seconds} label="SECS" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-[#2c2c2c] text-[#F4F1EA] w-10 h-12 md:w-12 md:h-14 flex items-center justify-center rounded shadow-md text-xl md:text-2xl font-mono font-bold">
                {String(value).padStart(2, "0")}
            </div>
            <span className="text-[0.6rem] font-sans font-bold tracking-widest mt-1 opacity-70 uppercase">
                {label}
            </span>
        </div>
    );
}
