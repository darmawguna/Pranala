import { Head } from "@inertiajs/react";
import { useState } from "react";
import CountdownTimer from "@/Components/CountdownTimer";
import MusicPlayer from "@/Components/MusicPlayer";
import MapsEmbed from "@/Components/MapsEmbed";
import { Button } from "@/Components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import CoverSection from "@/Components/Invitation/CoverSection";
import MainSection from "@/Components/Invitation/MainSection";
import EventDetailsSection from "@/Components/Invitation/EventDetailsSection";
import TimeEventSection from "@/Components/Invitation/TimeEventSection";
import MapSection from "@/Components/Invitation/MapSection";
import ClosingSection from "@/Components/Invitation/ClosingSection";
import { WeddingInfo } from "@/types";

interface Guest {
    id: number;
    name: string;
    slug: string;
    is_opened: boolean;
}



interface Props {
    guest: Guest;
    wedding?: WeddingInfo; // Wedding info di props juga jadi opsional
}

// 2. Menyiapkan Dummy Data untuk tampilan default
const dummyWeddingData: WeddingInfo = {
    bride_full_name: "Ni Luh Putu Dewi Anjani",
    bride_short_name: "Dewi",
    bride_father_name: "I Wayan Sudarma",
    bride_mother_name: "Ni Ketut Sari",
    groom_full_name: "I Made Agus Wibawa",
    groom_short_name: "Agus",
    groom_father_name: "I Nyoman Wijaya",
    groom_mother_name: "Ni Made Murni",
    event_date: "2026-02-14",
    event_time: "16:00:00",
    event_timezone: "WITA",
    venue_name: "Gedung Serbaguna Werdhi Budaya",
    venue_address:
        "Jln.Ir. Sutami, Br.Medahan, Desa Kemenuh, Sukawati, Gianyar",
    maps_embed_url: "https://maps.google.com/maps?q=-8.558103,115.2867391&z=17&output=embed", // Placeholder URL
    music_url: "/music/wedding-song.mp3", // Pastikan file ada atau kosongkan
    opening_text:
        "Atas Asung Kertha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa, kami bermaksud mengundang Bapak/Ibu/Saudara/i pada",
    closing_text:
        "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",
    quote_text: "Karmaphala adalah hukum sebab akibat yang abadi.",
};

export default function Invitation({ guest, wedding }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // 3. Menggabungkan data dummy dengan data props (jika ada)
    // Data props akan menimpa dummy jika tersedia. Jika props kosong, pakai dummy.
    const displayWedding: WeddingInfo = { ...dummyWeddingData, ...wedding };

    // Fallback date handling jika kosong
    const eventDateStr =
        displayWedding.event_date || new Date().toISOString().split("T")[0];
    const eventTimeStr = displayWedding.event_time || "08:00:00";

    // Format event datetime for countdown
    const eventDateTime = `${eventDateStr}T${eventTimeStr}`;

    // Format date for display
    const formatDate = (date: string) => {
        try {
            const d = new Date(date);
            const options: Intl.DateTimeFormatOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return d.toLocaleDateString("id-ID", options);
        } catch (e) {
            return date; // Return original string if error
        }
    };

    const handleOpenInvitation = () => {
        setIsOpen(true);
        // Delay sedikit memunculkan konten agar pas dengan animasi tirai terbuka
        setTimeout(() => {
            setShowContent(true);
        }, 500);
    };

    return (
        <>
            <Head title={`Undangan Pernikahan - ${guest.name}`} />

            {/* Music Player */}
            {displayWedding.music_url && isOpen && (
                <MusicPlayer musicUrl={displayWedding.music_url} autoplay />
            )}

            <CoverSection
                guest={guest}
                wedding={displayWedding}
                onOpen={handleOpenInvitation}
            />

            {/* Main Content - Shown after opening */}
            <div
                id="main-content"
                className={`transition-all duration-1000 ease-in-out ${showContent
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                    }`}
            >
                {/* Kita ganti semua section lama dengan 1 Component baru */}
                <MainSection wedding={displayWedding} />
            </div>

            <div>
                <TimeEventSection wedding={displayWedding} />
                <MapSection wedding={displayWedding} />
                <ClosingSection wedding={displayWedding} />
            </div>
        </>
    );
}
