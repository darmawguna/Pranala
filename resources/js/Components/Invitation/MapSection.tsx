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
                        "https://maps.google.com/maps?q=-8.558103,115.2867391&z=17&output=embed"
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
