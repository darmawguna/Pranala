import { Calendar, Clock, MapPin } from "lucide-react";
import CountdownTimer from "@/Components/CountdownTimer"; // Pastikan path import ini sesuai struktur folder Anda
import MapsEmbed from "@/Components/MapsEmbed"; // Pastikan path import ini sesuai

interface WeddingInfo {
    bride_full_name?: string;
    bride_short_name?: string;
    bride_father_name?: string;
    bride_mother_name?: string;
    groom_full_name?: string;
    groom_short_name?: string;
    groom_father_name?: string;
    groom_mother_name?: string;
    event_date?: string;
    event_time?: string;
    event_timezone?: string;
    venue_name?: string;
    venue_address?: string;
    maps_embed_url?: string;
    opening_text?: string;
    quote_text?: string;
}

const persons = 
    [
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
            isLast: true, // Flag untuk styling khusus elemen terakhir
        },
    ]

interface Props {
    wedding: WeddingInfo;
}

export default function MainSection({ wedding }: Props) {
    // Helper formatted date
    const formatDate = (date?: string) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const eventDateTime = `${wedding.event_date || ""}T${wedding.event_time || ""}`;

    return (
        <div className="relative min-h-screen bg-[#F4F1EA] text-[#462e29] overflow-hidden font-serif">
            {/* --- LAYER 1: FRAME BINGKAI --- */}
            {/* Menggunakan fixed/sticky atau absolute full height agar membingkai konten */}
            <div className="absolute inset-0 z-0 pointer-events-none h-full w-full">
                {/* GANTI src dengan path file PNG bingkai Anda */}
                <img
                    src="/images/frame-border.png"
                    alt="Frame Decoration"
                    className="w-full h-full object-fill opacity-80"
                />
            </div>

            {/* --- LAYER 2: DEKORASI WATERMARK --- */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 opacity-10 pointer-events-none z-0">
                <img
                    src="/images/lotus-watermark.webp"
                    alt="Watermark"
                    className="w-full h-full object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")} // Fallback jika gambar tidak ada
                />
            </div>

            {/* --- LAYER 3: KONTEN UTAMA --- */}
            <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto space-y-16">
                {/* 1. SECTION PEMBUKA (OM SWASTIASTU) */}
                <div className="text-center space-y-4">
                    <div className="text-4xl font-bold opacity-80">ᬑᬁ</div>
                    <h2 className="text-3xl sm:text-4xl font-bold font-bali tracking-wide">
                        Om Swastiastu
                    </h2>
                    <p className="italic text-lg opacity-80 font-serif">
                        Om Awignamastu Namo Siddham
                    </p>

                    {/* Garis Pembatas Custom */}
                    <div className="flex items-center justify-center gap-2 py-4">
                        <div className="h-[2px] w-12 bg-gradient-to-l from-[#462e29] to-transparent"></div>
                        <div className="h-2 w-2 rotate-45 bg-[#462e29]"></div>
                        <div className="h-[2px] w-12 bg-gradient-to-r from-[#462e29] to-transparent"></div>
                    </div>

                    {wedding.opening_text && (
                        <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
                            {wedding.opening_text}
                        </p>
                    )}
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">
                            Upacara Manusa Yadnya Mepandes (Potong Gigi) Putra
                            dan Putri kami
                        </h3>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 py-4">
                    <img
                        src="/images/garis-emar.webp"
                        alt="Watermark"
                        className="w-full h-full object-contain"
                        onError={(e) =>
                            (e.currentTarget.style.display = "none")
                        } // Fallback jika gambar tidak ada
                    />
                </div>

                {/* 2. COUPLE CARDS (GLASSMORPHISM) */}
                <div className="space-y-6">
                    {/* Judul Bagian */}

                    {/* Grid Card */}
                    <div className="space-y-8">
                        {/* Judul Bagian */}
                        <div className="text-center"></div>
                        {/* Grid Container */}
                        {/* Menggunakan grid-cols-1 untuk HP, dan 2 kolom untuk Tablet/PC */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                            {/* Kita map data hardcode di sini agar kodenya rapi */}
                            {persons.map((person, index) => (
                                <div
                                    key={index}
                                    className={`relative group w-full max-w-sm ${person.isLast ? "md:col-span-2 md:w-1/2" : ""}`}
                                >
                                    {/* Efek Glassmorphism: Ukuran lebih compact (p-6) */}
                                    <div className="bg-[#949a7e]/20 backdrop-blur-md border border-white/40 rounded-xl p-6 shadow-lg text-center relative overflow-hidden transition-transform hover:-translate-y-1 duration-500">
                                        {/* Hiasan sudut kartu (SVG) */}
                                        <div className="absolute top-2 right-2 opacity-30 text-[#462e29]">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                                            </svg>
                                        </div>

                                        {/* NAMA (Font size diturunkan ke text-2xl agar muat banyak) */}
                                        <h3 className="font-bali text-2xl font-bold text-[#462e29] mb-3 drop-shadow-sm leading-tight">
                                            {person.name}
                                        </h3>

                                        {/* Divider Kecil */}
                                        <div className="w-12 h-0.5 bg-[#462e29]/40 mx-auto mb-3"></div>

                                        {/* Label Keterangan */}
                                        <p className="text-xs font-sans mb-1 font-bold uppercase tracking-widest text-[#462e29]/70">
                                            {person.label}
                                        </p>

                                        {/* Nama Orang Tua */}
                                        <div className="font-serif text-base leading-tight text-[#462e29]">
                                            <p>{person.parents[0]}</p>
                                            <p className="text-xs opacity-60 my-0.5">
                                                &
                                            </p>
                                            <p>{person.parents[1]}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. SECTION TANGGAL & COUNTDOWN */}
                <div className="text-center space-y-8 pt-8">
                    <div className="relative">
                        <div className="text-lg font-bold uppercase tracking-widest mb-2">
                            Pada
                        </div>
                        <div className="text-5xl font-bali font-bold text-[#462e29]">
                            {new Date(wedding.event_date || "").getDate()}
                        </div>
                        <div className="text-2xl font-serif italic mb-2">
                            {new Date(
                                wedding.event_date || "",
                            ).toLocaleDateString("id-ID", {
                                month: "long",
                                year: "numeric",
                            })}
                        </div>
                        <div className="w-full h-[1px] bg-[#462e29]/30 max-w-xs mx-auto"></div>
                    </div>

                    <div className="font-sans font-bold text-lg">
                        Pukul {wedding.event_time} {wedding.event_timezone}
                        /selesai
                    </div>

                    {/* Countdown Component Wrapper agar sesuai tema */}
                    <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-inner">
                        <CountdownTimer
                            targetDate={eventDateTime}
                            timezone={wedding.event_timezone || "WITA"}
                        />
                    </div>
                </div>

                {/* 4. MAPS / LOKASI (Optional jika data ada) */}
                {wedding.maps_embed_url && (
                    <div className="pt-8">
                        <div className="text-center mb-6">
                            <MapPin className="w-8 h-8 mx-auto mb-2 text-[#462e29]" />
                            <h3 className="text-2xl font-bold font-bali">
                                Lokasi Acara
                            </h3>
                            <p className="text-gray-700">
                                {wedding.venue_name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {wedding.venue_address}
                            </p>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white/50">
                            <MapsEmbed
                                embedUrl={wedding.maps_embed_url}
                                venueName={wedding.venue_name || ""}
                                address={wedding.venue_address || ""}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
