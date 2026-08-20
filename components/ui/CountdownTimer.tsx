// components/ui/CountdownTimer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface CountdownTimerProps {
  endDate?: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({
  endDate,
  className = '',
}: CountdownTimerProps) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 2,
    hours: 14,
    minutes: 48,
    seconds: 22,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const targetDate = endDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  if (isExpired) {
    return (
      <div className={`font-headline-md text-white ${className}`}>
        {t('countdown.expired')}
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: t('countdown.days') },
    { value: timeLeft.hours, label: t('countdown.hours') },
    { value: timeLeft.minutes, label: t('countdown.minutes') },
    { value: timeLeft.seconds, label: t('countdown.seconds') },
  ];

  return (
    <div className={`flex space-x-6 font-headline-md text-white ${className}`}>
      {timeUnits.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span className="text-gold text-2xl md:text-3xl font-bold">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-widest opacity-60">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;