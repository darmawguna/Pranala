import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import CountdownTimer from "@/Components/CountdownTimer";
import MusicPlayer from "@/Components/MusicPlayer";
import MapsEmbed from "@/Components/MapsEmbed";
import { Button } from "@/Components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

interface Guest {
    id: number;
    name: string;
    slug: string;
    is_opened: boolean;
}

interface WeddingInfo {
    bride_full_name: string;
    bride_short_name: string;
    bride_father_name: string;
    bride_mother_name: string;
    groom_full_name: string;
    groom_short_name: string;
    groom_father_name: string;
    groom_mother_name: string;
    event_date: string;
    event_time: string;
    event_timezone: string;
    venue_name: string;
    venue_address: string;
    maps_embed_url: string;
    cover_image?: string;
    bride_photo?: string;
    groom_photo?: string;
    music_url?: string;
    opening_text?: string;
    closing_text?: string;
    quote_text?: string;
}

interface Props {
    guest: Guest;
    wedding: WeddingInfo;
}

export default function Invitation({ guest, wedding }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // Format event datetime for countdown
    const eventDateTime = `${wedding.event_date}T${wedding.event_time}`;

    // Format date for display
    const formatDate = (date: string) => {
        const d = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return d.toLocaleDateString("id-ID", options);
    };

    const handleOpenInvitation = () => {
        setIsOpen(true);
        setTimeout(() => {
            setShowContent(true);
            // Scroll to content smoothly
            document
                .getElementById("main-content")
                ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    return (
        <>
            <Head title={`Undangan Pernikahan - ${guest.name}`} />

            {/* Music Player */}
            {wedding.music_url && isOpen && (
                <MusicPlayer musicUrl={wedding.music_url} autoplay />
            )}

            {/* Cover Section */}
            <section
                className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c4b5a0] to-[#8b7355] relative overflow-hidden transition-all duration-500 ${
                    isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-1/2 h-1/2">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <path
                                fill="#3d2f1f"
                                d="M45.3,-62.3C57.9,-53.1,66.7,-38.5,71.3,-22.8C75.9,-7.1,76.3,9.7,70.1,24.3C63.9,38.9,51.1,51.3,36.8,59.1C22.5,66.9,6.6,70.1,-9.8,68.4C-26.2,66.7,-43.1,60.1,-56.8,48.9C-70.5,37.7,-81,21.9,-83.4,4.9C-85.8,-12.1,-80.1,-30.3,-68.9,-44.1C-57.7,-57.9,-41,-67.3,-23.8,-73.4C-6.6,-79.5,11.1,-82.3,26.8,-77.8C42.5,-73.3,56.1,-61.5,45.3,-62.3Z"
                                transform="translate(100 100)"
                            />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <path
                                fill="#3d2f1f"
                                d="M45.3,-62.3C57.9,-53.1,66.7,-38.5,71.3,-22.8C75.9,-7.1,76.3,9.7,70.1,24.3C63.9,38.9,51.1,51.3,36.8,59.1C22.5,66.9,6.6,70.1,-9.8,68.4C-26.2,66.7,-43.1,60.1,-56.8,48.9C-70.5,37.7,-81,21.9,-83.4,4.9C-85.8,-12.1,-80.1,-30.3,-68.9,-44.1C-57.7,-57.9,-41,-67.3,-23.8,-73.4C-6.6,-79.5,11.1,-82.3,26.8,-77.8C42.5,-73.3,56.1,-61.5,45.3,-62.3Z"
                                transform="translate(100 100) rotate(180)"
                            />
                        </svg>
                    </div>
                </div>

                {/* Wayang Decorations */}
                <div className="absolute top-10 right-10 w-32 h-32 opacity-20">
                    <img
                        src="/images/wayang-1.png"
                        alt="wayang decoration"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                </div>
                <div className="absolute bottom-10 left-10 w-32 h-32 opacity-20">
                    <img
                        src="/images/wayang-2.png"
                        alt="wayang decoration"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                </div>

                {/* Main Content */}
                <div className="relative z-10 text-center px-6 max-w-2xl">
                    {/* Om Swastiastu Symbol */}
                    <div className="mb-8">
                        <div className="text-4xl sm:text-5xl text-[#3d2f1f] font-serif mb-4">
                            ᬑᬁ
                        </div>
                        <h2 className="text-xl sm:text-2xl text-[#3d2f1f] font-serif mb-2">
                            Om Swastiastu
                        </h2>
                        <p className="text-sm sm:text-base text-gray-700 italic">
                            Om Awignamastu Namo Siddham
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-24 h-0.5 bg-[#3d2f1f] mx-auto mb-8"></div>

                    {/* Opening Text */}
                    <div className="mb-8">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                            Atas Asung Kertha Ida Sang Hyang Widhi Wasa/Tuhan
                            Yang Maha Esa,
                            <br />
                            kami bermaksud mengundang
                        </p>
                        <p className="text-base sm:text-lg text-gray-800 font-medium">
                            Bapak/Ibu/Saudara/i pada
                        </p>
                    </div>

                    {/* Guest Name Highlight */}
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 sm:p-8 mb-8 shadow-lg border-2 border-[#3d2f1f]/20">
                        <p className="text-sm text-gray-600 mb-2">
                            Kepada Bapak/Ibu/Saudara/i
                        </p>
                        <h1 className="text-2xl sm:text-4xl font-bold text-[#3d2f1f] mb-2">
                            {guest.name}
                        </h1>
                    </div>

                    {/* Couple Names */}
                    <div className="mb-8 space-y-2">
                        <h3 className="text-lg sm:text-xl text-gray-800 font-serif">
                            Keluarga
                        </h3>
                        <p className="text-xl sm:text-2xl font-bold text-[#3d2f1f] italic">
                            {wedding.bride_short_name}
                        </p>
                        <p className="text-lg text-gray-700">&</p>
                        <p className="text-xl sm:text-2xl font-bold text-[#3d2f1f] italic">
                            {wedding.groom_short_name}
                        </p>
                    </div>

                    {/* Open Button */}
                    <Button
                        onClick={handleOpenInvitation}
                        size="lg"
                        className="bg-[#3d2f1f] hover:bg-[#2d1f0f] text-white px-12 py-6 text-lg rounded-full shadow-2xl transform transition-all hover:scale-105"
                    >
                        Buka Undangan
                    </Button>

                    {/* Bottom Note */}
                    <p className="mt-8 text-xs sm:text-sm text-gray-600 italic">
                        Mohon maaf apabila ada kesalahan penulisan nama/gelar
                    </p>
                </div>
            </section>

            {/* Main Content - Shown after opening */}
            <div
                id="main-content"
                className={`transition-all duration-500 ${
                    showContent
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Couple Section */}
                <section className="min-h-screen bg-gradient-to-b from-[#f5f1eb] to-white py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <div className="text-3xl text-[#3d2f1f] font-serif mb-4">
                                ᬑᬁ
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d2f1f] mb-4">
                                Om Swastiastu
                            </h2>
                            <p className="text-gray-600 italic">
                                Om Awignamastu Namo Siddham
                            </p>
                            <div className="w-24 h-0.5 bg-[#3d2f1f] mx-auto mt-6"></div>
                        </div>

                        {/* Opening Quote */}
                        {wedding.opening_text && (
                            <div className="text-center mb-16 max-w-3xl mx-auto">
                                <p className="text-gray-700 leading-relaxed italic">
                                    {wedding.opening_text}
                                </p>
                            </div>
                        )}

                        {/* Couple Info */}
                        <div className="grid md:grid-cols-2 gap-12 mb-16">
                            {/* Bride */}
                            <div className="text-center">
                                <div className="mb-6">
                                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#3d2f1f]/20 shadow-xl mb-6">
                                        {wedding.bride_photo ? (
                                            <img
                                                src={wedding.bride_photo}
                                                alt={wedding.bride_short_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#c4b5a0] to-[#8b7355] flex items-center justify-center">
                                                <span className="text-4xl text-white">
                                                    👰
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#3d2f1f] mb-2">
                                        {wedding.bride_full_name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Putri dari
                                    </p>
                                    <div className="space-y-1 text-gray-700">
                                        <p className="font-medium">
                                            {wedding.bride_father_name}
                                        </p>
                                        <p className="text-gray-500">&</p>
                                        <p className="font-medium">
                                            {wedding.bride_mother_name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Groom */}
                            <div className="text-center">
                                <div className="mb-6">
                                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#3d2f1f]/20 shadow-xl mb-6">
                                        {wedding.groom_photo ? (
                                            <img
                                                src={wedding.groom_photo}
                                                alt={wedding.groom_short_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#c4b5a0] to-[#8b7355] flex items-center justify-center">
                                                <span className="text-4xl text-white">
                                                    🤵
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#3d2f1f] mb-2">
                                        {wedding.groom_full_name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Putra dari
                                    </p>
                                    <div className="space-y-1 text-gray-700">
                                        <p className="font-medium">
                                            {wedding.groom_father_name}
                                        </p>
                                        <p className="text-gray-500">&</p>
                                        <p className="font-medium">
                                            {wedding.groom_mother_name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Event Section with Countdown */}
                <section className="min-h-screen bg-gradient-to-b from-white to-[#f5f1eb] py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Section Title */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d2f1f] mb-4">
                                Waktu & Tempat Acara
                            </h2>
                            <div className="w-24 h-0.5 bg-[#3d2f1f] mx-auto"></div>
                        </div>

                        {/* Event Details Card */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 mb-12 border border-[#3d2f1f]/10">
                            {/* Date & Time */}
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                                    <Calendar className="w-5 h-5" />
                                    <span className="text-lg">
                                        {formatDate(wedding.event_date)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                                    <Clock className="w-5 h-5" />
                                    <span className="text-lg">
                                        {wedding.event_time}{" "}
                                        {wedding.event_timezone}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Pukul 10:00 Wita/selesai
                                </p>
                            </div>

                            {/* Countdown Timer */}
                            <div className="mb-8">
                                <CountdownTimer
                                    targetDate={eventDateTime}
                                    timezone={wedding.event_timezone}
                                />
                            </div>

                            {/* Venue */}
                            <div className="text-center border-t border-gray-200 pt-8">
                                <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-lg font-semibold">
                                        {wedding.venue_name}
                                    </span>
                                </div>
                                <p className="text-gray-600">
                                    {wedding.venue_address}
                                </p>
                            </div>
                        </div>

                        {/* Quote */}
                        {wedding.quote_text && (
                            <div className="bg-[#3d2f1f]/5 rounded-xl p-8 mb-12 border-l-4 border-[#3d2f1f]">
                                <p className="text-gray-700 italic text-center leading-relaxed">
                                    "{wedding.quote_text}"
                                </p>
                                <p className="text-sm text-gray-600 text-center mt-4">
                                    — Bhagavad Gita, Bab III, Sloka 10
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Location Section */}
                <section className="min-h-screen bg-gradient-to-b from-[#f5f1eb] to-white py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d2f1f] mb-4">
                                Lokasi Acara
                            </h2>
                            <div className="w-24 h-0.5 bg-[#3d2f1f] mx-auto mb-6"></div>
                            <p className="text-gray-600">Ada ku kirim</p>
                        </div>

                        {wedding.maps_embed_url && (
                            <MapsEmbed
                                embedUrl={wedding.maps_embed_url}
                                venueName={wedding.venue_name}
                                address={wedding.venue_address}
                            />
                        )}
                    </div>
                </section>

                {/* Closing Section */}
                <section className="min-h-screen bg-gradient-to-b from-white to-[#c4b5a0] py-20 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d2f1f] mb-4">
                                Salam-salam
                            </h2>
                            <div className="w-24 h-0.5 bg-[#3d2f1f] mx-auto"></div>
                        </div>

                        {/* Lotus Symbol */}
                        <div className="mb-8">
                            <svg
                                className="w-24 h-24 mx-auto text-[#3d2f1f] opacity-20"
                                viewBox="0 0 100 100"
                                fill="currentColor"
                            >
                                <path d="M50,20 Q30,30 30,50 Q30,70 50,80 Q70,70 70,50 Q70,30 50,20 Z M50,25 Q35,35 35,50 Q35,65 50,75 Q65,65 65,50 Q65,35 50,25 Z" />
                            </svg>
                        </div>

                        {/* Closing Text */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-xl mb-8">
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Merupakan suatu kehormatan dan kebahagiaan bagi
                                kami, apabila Bapak/Ibu/Saudara/i berkenan hadir
                                untuk memberikan doa kepada putra dan putri kami
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-8">
                                Atas doa dan kehadirannya kami ucapkan terima
                                kasih
                            </p>

                            {/* Om Shanti */}
                            <div className="space-y-4">
                                <p className="text-xl font-serif text-[#3d2f1f] italic">
                                    Om Shanti, Shanti, Shanti Om
                                </p>
                                <div className="text-2xl text-[#3d2f1f] font-serif">
                                    ᬑᬁᬰᬵᬦ᭄ᬢᬶᬂᬰᬵᬦ᭄ᬢᬶᬂᬰᬵᬦ᭄ᬢᬶᬑᬁ
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-sm text-gray-600">
                            <p>Kami yang berbahagia,</p>
                            <p className="font-semibold mt-2">
                                Keluarga {wedding.bride_short_name} &{" "}
                                {wedding.groom_short_name}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
