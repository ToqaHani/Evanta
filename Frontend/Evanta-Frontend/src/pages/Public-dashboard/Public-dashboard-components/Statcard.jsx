import React from 'react';
import Icon from './Icons';

export default function StatCard({ icon, title, value, subtitle, progress, className = '' }) {
  return <article className={`stat-card ${className}`}>
    <div className="stat-icon"><Icon name={icon}/></div>
    <div className="stat-copy"><span>{title}</span><strong>{value}</strong><small>{subtitle}</small></div>
    {progress != null && <div className="mini-ring" style={{ '--p': `${progress}%` }}><span>{progress}%</span></div>}
  </article>;
}
