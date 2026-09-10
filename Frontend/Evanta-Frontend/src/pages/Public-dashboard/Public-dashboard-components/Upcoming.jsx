import React from 'react';
import Icon from './Icons';
export default function Upcoming({ items }) {
  return <section className="card upcoming-card"><div className="card-head"><div><span className="section-kicker">UPCOMING</span><h2>What's next</h2></div><a href="#tasks">See all <span>→</span></a></div><div className="upcoming-list">{items.map(item => <a href="#tasks" className="upcoming-item" key={item.id}><span className={`upcoming-icon ${item.tone}`}><Icon name="calendar" size={18}/></span><span><strong>{item.title}</strong><small>{item.due}</small></span><Icon name="chevron" size={18} className="chevron"/></a>)}</div></section>;
}
