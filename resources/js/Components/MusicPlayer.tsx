import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface MusicPlayerProps {
    musicUrl: string;
    autoplay?: boolean;
}

export default function MusicPlayer({
    musicUrl,
    autoplay = true,
}: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (autoplay) {
            audio.play().catch((error) => {
                console.log("Autoplay blocked or failed:", error);
                setIsPlaying(false);
            });
        }
    }, [autoplay, musicUrl]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(console.error);
            setIsPlaying(true);
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 scale-90 sm:scale-100 origin-bottom-right">
            <audio
                ref={audioRef}
                src={musicUrl}
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            <Button
                size="icon"
                variant="secondary"
                onClick={togglePlay}
                className={`rounded-full shadow-xl backdrop-blur transition-all duration-300 ${
                    isPlaying
                        ? "bg-[#462e29] text-white hover:bg-[#5a3c36]"
                        : "bg-white/90 text-[#462e29] hover:bg-white"
                }`}
            >
                {isPlaying ? (
                    <div className="relative flex items-center justify-center">
                        <Pause className="h-5 w-5" />
                        <div className="absolute -inset-2 border-2 border-[#462e29]/20 rounded-full animate-ping" />
                    </div>
                ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                )}
            </Button>

            {/* <Button
                size="icon"
                variant="secondary"
                onClick={toggleMute}
                className="rounded-full shadow-lg bg-white/80 backdrop-blur hover:bg-white text-[#462e29]/70"
            >
                {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                ) : (
                    <Volume2 className="h-5 w-5" />
                )}
            </Button> */}
        </div>
    );
}
