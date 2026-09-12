import React from 'react';
import ProgressBar from './ProgressBar';
export default function TaskProgress({ data }) {
  const value = Math.round((data.completed / data.total) * 100);
  return <section className="card task-progress-card"><div className="card-head"><div><span className="section-kicker">TASKS</span><h2>Task Progress</h2></div><a href="#tasks">Open tasks <span>→</span></a></div><div className="task-number"><strong>{data.completed}</strong><span>/ {data.total} completed</span></div><ProgressBar value={value} label={`${value}%`} /><p>Keep the momentum going — you're on track.</p></section>;
}
