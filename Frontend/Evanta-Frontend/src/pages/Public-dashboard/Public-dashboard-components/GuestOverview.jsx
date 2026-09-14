import React from 'react';
export default function GuestOverview({ data }) {
  const rows = [['Confirmed', data.confirmed, 'good'], ['Maybe', data.maybe, 'warn'], ['Not Coming', data.notComing, 'bad'], ['No Response', data.noResponse, 'neutral']];
  return <section className="card overview-card"><div className="card-head"><div><span className="section-kicker">GUEST OVERVIEW</span><h2>RSVP snapshot</h2></div><a href="#guests">View guests <span>→</span></a></div><div className="guest-list">{rows.map(([name, value, tone]) => <div className="guest-row" key={name}><span className={`status-dot ${tone}`} /><span>{name}</span><strong>{value}</strong></div>)}</div></section>;
}
