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
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Try to autoplay (will only work after user interaction due to browser policies)
        if (autoplay && hasInteracted) {
            audio.play().catch(() => {
                // Autoplay failed, user needs to interact
                setIsPlaying(false);
            });
        }
    }, [autoplay, hasInteracted]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!hasInteracted) {
            setHasInteracted(true);
        }

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex gap-2">
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
                className="rounded-full shadow-lg bg-white/90 backdrop-blur hover:bg-white"
            >
                {isPlaying ? (
                    <Pause className="h-5 w-5" />
                ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                )}
            </Button>

            <Button
                size="icon"
                variant="secondary"
                onClick={toggleMute}
                className="rounded-full shadow-lg bg-white/90 backdrop-blur hover:bg-white"
            >
                {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                ) : (
                    <Volume2 className="h-5 w-5" />
                )}
            </Button>
        </div>
    );
}
