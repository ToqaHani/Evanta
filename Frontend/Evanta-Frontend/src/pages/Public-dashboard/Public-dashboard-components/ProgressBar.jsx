import React from 'react';
export default function ProgressBar({ value, label }) {
  return <div className="progress-wrap"><div className="progress-track"><span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>{label && <strong>{label}</strong>}</div>;
}
