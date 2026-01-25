import { MapPin } from "lucide-react";
import CountdownTimer from "@/Components/CountdownTimer";
import MapsEmbed from "@/Components/MapsEmbed";
import { WeddingInfo } from "@/types";



interface Props {
    wedding: WeddingInfo;
}

export default function EventDetailsSection({ wedding }: Props) {
    const eventDateTime = `${wedding.event_date || ""}T${wedding.event_time || ""}`;

    return (
        // UI SENDIRI: Background berbeda (misal Putih Bersih) untuk memisahkan section
        <section className="relative py-20 px-6 bg-gradient-to-b from-[#F4F1EA] to-white text-[#462e29]">
            {/* Opsional: Dekorasi Pembatas Atas */}
            <div className="max-w-4xl mx-auto space-y-16">
                {/* 3. TANGGAL & COUNTDOWN */}
                <div className="text-center space-y-8">
                    <div className="relative">
                        <div className="text-lg font-bold uppercase tracking-widest mb-2 text-[#462e29]/70">
                            Pada
                        </div>
                        <div className="text-6xl font-bali font-bold text-[#462e29] drop-shadow-md">
                            {new Date(wedding.event_date || "").getDate()}
                        </div>
                        <div className="text-2xl font-serif italic mb-2 text-[#462e29]">
                            {new Date(
                                wedding.event_date || "",
                            ).toLocaleDateString("id-ID", {
                                month: "long",
                                year: "numeric",
                            })}
                        </div>
                    </div>

                    <div className="font-sans font-bold text-lg bg-[#462e29] text-[#F4F1EA] py-2 px-6 rounded-full inline-block shadow-md">
                        Pukul {wedding.event_time} {wedding.event_timezone} -
                        Selesai
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-[#462e29]/10 shadow-xl max-w-md mx-auto">
                        <CountdownTimer
                            targetDate={eventDateTime}
                            timezone={wedding.event_timezone || "WITA"}
                        />
                    </div>
                </div>

                {/* 4. MAPS / LOKASI */}
                {wedding.maps_embed_url && (
                    <div>
                        <div className="text-center mb-6">
                            <MapPin className="w-8 h-8 mx-auto mb-2 text-[#462e29]" />
                            <h3 className="text-2xl font-bold font-bali text-[#462e29]">
                                Lokasi Acara
                            </h3>
                            <p className="text-[#462e29] font-semibold">
                                {wedding.venue_name}
                            </p>
                            <p className="text-sm text-[#462e29]/80">
                                {wedding.venue_address}
                            </p>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                            <MapsEmbed
                                embedUrl={wedding.maps_embed_url}
                                venueName={wedding.venue_name || ""}
                                address={wedding.venue_address || ""}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
