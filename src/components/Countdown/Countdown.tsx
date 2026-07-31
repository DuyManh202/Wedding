import React, { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // August 7, 2026
    const targetDate = new Date('2026-08-07T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown-section">
      <div className="countdown-container">
        <h2 className="section-title">Ngày Trọng Đại</h2>
        <p className="section-subtitle">Cùng đếm ngược tới ngày chúng mình chung đôi</p>
        
        <div className="countdown-timer">
          <div className="time-box">
            <span className="time-number">{timeLeft.days}</span>
            <span className="time-label">Ngày</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-box">
            <span className="time-number">{timeLeft.hours}</span>
            <span className="time-label">Giờ</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-box">
            <span className="time-number">{timeLeft.minutes}</span>
            <span className="time-label">Phút</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-box">
            <span className="time-number">{timeLeft.seconds}</span>
            <span className="time-label">Giây</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
