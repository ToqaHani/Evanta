import React, { useEffect, useState } from 'react';

function getRemaining(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return { days, hours, minutes };
}

export default function Countdown({ date }) {
  const [time, setTime] = useState(() => getRemaining(date));
  useEffect(() => { const id = setInterval(() => setTime(getRemaining(date)), 30000); return () => clearInterval(id); }, [date]);
  return <div className="countdown-card">
    <div className="section-kicker">COUNTDOWN</div>
    <div className="countdown-grid">
      {[[time.days, 'Days'], [time.hours, 'Hours'], [time.minutes, 'Minutes']].map(([n, label]) => <div className="count-box" key={label}><strong>{String(n).padStart(2, '0')}</strong><span>{label}</span></div>)}
    </div>
    <p>until your event</p>
  </div>;
}
