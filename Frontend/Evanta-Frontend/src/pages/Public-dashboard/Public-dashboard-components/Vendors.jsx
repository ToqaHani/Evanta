import React from 'react';
import Icon from './Icons';
export default function Vendors({ items }) {
  return <section className="card vendors-card"><div className="card-head"><div><span className="section-kicker">VENDORS</span><h2>Booking status</h2></div><a href="#vendors">Manage vendors <span>→</span></a></div><div className="vendor-grid">{items.map(v => <div className="vendor-item" key={v.id}><span className={`vendor-check ${v.booked ? 'booked' : ''}`}>{v.booked ? '✓' : '○'}</span><span>{v.name}</span><small>{v.booked ? 'Booked' : 'Pending'}</small></div>)}</div></section>;
}
