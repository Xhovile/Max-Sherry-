import React, { useState, useEffect } from 'react';
import { Clock, Hourglass, Flame } from 'lucide-react';

interface EventCountdownProps {
  date: string;
  time: string;
  status: 'upcoming' | 'soldout' | 'past';
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function EventCountdown({ date, time, status }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  useEffect(() => {
    if (status !== 'upcoming') {
      setTimeLeft(prev => ({ ...prev, isCompleted: true }));
      return;
    }

    const calculateTimeLeft = () => {
      // Safely parse date and time
      const targetString = `${date}T${time || '00:00'}:00`;
      const targetDate = new Date(targetString);
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false
      };
    };

    // Set initial
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date, time, status]);

  if (timeLeft.isCompleted) {
    return null; // Don't show countdown for past/completed events
  }

  // Determine if time is low (less than 48 hours) to increase urgency
  const totalHoursLeft = timeLeft.days * 24 + timeLeft.hours;
  const isUrgent = totalHoursLeft < 48;

  return (
    <div className="bg-[#1e1e1e] border border-[#2e2e2e] p-4.5 rounded-sm shadow-inner mt-4 font-sans">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center space-x-2">
          {isUrgent ? (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
          ) : (
            <span className="flex h-2 w-2 relative">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
          )}
          <span className={`text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 ${
            isUrgent ? 'text-red-400' : 'text-[#D4AF37]'
          }`}>
            {isUrgent ? <Flame className="w-3.5 h-3.5 animate-bounce" /> : <Hourglass className="w-3.5 h-3.5" />}
            {isUrgent ? 'Extremely Limited Seating' : 'Live Seating Countdown'}
          </span>
        </div>
        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
          {timeLeft.days > 0 ? `${timeLeft.days}d remaining` : 'Starts today'}
        </span>
      </div>

      {/* Ticking Grid Boxes */}
      <div className="grid grid-cols-4 gap-2 text-center">
        {/* Days box */}
        <div className="bg-[#121212] border border-[#242424] px-2.5 py-2 rounded-sm">
          <div className="font-mono text-xl font-bold text-[#F5F5F5] tracking-tight">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-[8px] uppercase tracking-widest text-neutral-500 mt-1 font-medium">Days</div>
        </div>

        {/* Hours box */}
        <div className="bg-[#121212] border border-[#242424] px-2.5 py-2 rounded-sm">
          <div className="font-mono text-xl font-bold text-[#F5F5F5] tracking-tight">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-[8px] uppercase tracking-widest text-neutral-500 mt-1 font-medium">Hours</div>
        </div>

        {/* Minutes box */}
        <div className="bg-[#121212] border border-[#242424] px-2.5 py-2 rounded-sm">
          <div className="font-mono text-xl font-bold text-[#F5F5F5] tracking-tight">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-[8px] uppercase tracking-widest text-neutral-500 mt-1 font-medium">Mins</div>
        </div>

        {/* Seconds box */}
        <div className="bg-[#121212] border border-[#242424] px-2.5 py-2 rounded-sm">
          <div className={`font-mono text-xl font-bold tracking-tight transition-colors duration-150 ${
            isUrgent ? 'text-red-500' : 'text-[#D4AF37]'
          }`}>
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-[8px] uppercase tracking-widest text-neutral-500 mt-1 font-medium">Secs</div>
        </div>
      </div>
    </div>
  );
}
