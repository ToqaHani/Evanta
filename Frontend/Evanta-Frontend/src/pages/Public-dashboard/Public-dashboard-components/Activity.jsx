import React from 'react';
import Icon from './Icons';
export default function Activity({ items }) {
  return <section className="card activity-card"><div className="card-head"><div><span className="section-kicker">RECENT ACTIVITY</span><h2>Latest updates</h2></div><Icon name="activity" className="muted-icon"/></div><div className="activity-list">{items.map(item => <div className="activity-item" key={item.id}><span className="activity-icon"><Icon name={item.icon === 'plus' ? 'plus' : item.icon === 'task' ? 'checkSquare' : 'users'} size={16}/></span><div><strong>{item.text}</strong><small>{item.time}</small></div></div>)}</div></section>;
}
