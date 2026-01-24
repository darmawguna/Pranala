import { useEffect, useState } from "react";
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
} from "date-fns";

interface CountdownTimerProps {
    targetDate: string; // ISO format date string
    timezone?: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({
    targetDate,
    timezone = "WITA",
}: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const target = new Date(targetDate);

            if (target <= now) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            const days = differenceInDays(target, now);
            const hours = differenceInHours(target, now) % 24;
            const minutes = differenceInMinutes(target, now) % 60;
            const seconds = differenceInSeconds(target, now) % 60;

            return { days, hours, minutes, seconds };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeBox = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <div className="bg-[#3d2f1f] text-white rounded-lg p-4 sm:p-6 min-w-[60px] sm:min-w-[80px] shadow-lg">
                <span className="text-2xl sm:text-4xl font-bold tabular-nums">
                    {String(value).padStart(2, "0")}
                </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-600 mt-2 uppercase tracking-wider">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex justify-center gap-2 sm:gap-4">
            <TimeBox value={timeLeft.days} label="Days" />
            <div className="flex items-center text-2xl text-gray-400 pb-8">
                :
            </div>
            <TimeBox value={timeLeft.hours} label="Hrs" />
            <div className="flex items-center text-2xl text-gray-400 pb-8">
                :
            </div>
            <TimeBox value={timeLeft.minutes} label="Mins" />
            <div className="flex items-center text-2xl text-gray-400 pb-8">
                :
            </div>
            <TimeBox value={timeLeft.seconds} label="Secs" />
        </div>
    );
}
