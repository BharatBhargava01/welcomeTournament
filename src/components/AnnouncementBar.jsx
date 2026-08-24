import React, { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    // Target deadline: August 31, 2026 23:59:59 IST
    const targetDate = new Date(2026, 7, 31, 23, 59, 59);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, isExpired: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div class="announcement-bar">
      <div class="announcement-content">
        <span class="badge-live">
          <i class="fa-solid fa-circle-dot pulse"></i> REGISTRATION LIVE
        </span>
        <span class="announcement-text">
          Welcome Batch of 2026! Registrations close in{' '}
          {timeLeft.isExpired ? (
            <strong class="text-gold">Registration Closed</strong>
          ) : (
            <strong>
              {pad(timeLeft.days)}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
            </strong>
          )}
          . Select your sport below to register!
        </span>
      </div>
    </div>
  );
}
