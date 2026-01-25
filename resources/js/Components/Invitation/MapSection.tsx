import { WeddingInfo } from "@/types";

interface Props {
    wedding: WeddingInfo;
}

export default function MapSection({ wedding }: Props) {
    return (
        <div className="w-full bg-[#f4f1ea] pb-16 px-4 flex flex-col items-center">
            <h3 className="font-bali text-2xl mb-6 text-[#462e29]">
                Petunjuk Arah
            </h3>

            <div className="w-full max-w-4xl h-64 md:h-96 rounded-xl overflow-hidden shadow-lg border border-[#462e29]/20 relative">
                <iframe
                    src={
                        wedding.maps_embed_url ||
                        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.59123456789!2d115.3056789!3d-8.5678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzQnMDQuNCJTIDExNcKwMTgnMjAuNCJF!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                ></iframe>

                {/* Overlay Button (Optional fallback or enhancement) */}
                <a
                    href={wedding.maps_embed_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-[#462e29] px-4 py-2 rounded-lg shadow-sm font-sans text-xs font-bold hover:bg-[#462e29] hover:text-white transition-colors"
                >
                    Buka di Google Maps
                </a>
            </div>
        </div>
    );
}
