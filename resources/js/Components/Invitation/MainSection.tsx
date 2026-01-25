import OpeningSection from "./OpeningSection";
import ParticipantSection from "./ParticipantSection";
import { WeddingInfo } from "@/types";



interface Props {
    wedding: WeddingInfo;
}

export default function MainSection({ wedding }: Props) {
    return (
        <div className="min-h-screen bg-[#F4F1EA] text-[#462e29] font-serif flex flex-col relative">
            {/* STICKY OPENING SECTION */}
            {/* Tetap di tempat saat di-scroll, tertutup oleh ParticipantSection */}
            <div className="sticky top-0 h-screen w-full z-0 flex flex-col justify-center">
                <OpeningSection wedding={wedding} />
            </div>

            {/* SCROLLABLE PARTICIPANT SECTION */}
            {/* Background transparent agar OpeningSection tetap terlihat di belakang (kecuali tertutup kartu/wayang) */}
            <div className="relative z-10 w-full bg-transparent">
                <ParticipantSection />
            </div>
        </div>
    );
}
