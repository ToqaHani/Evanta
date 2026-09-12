import React from 'react';
import ProgressBar from './ProgressBar';
export default function BudgetOverview({ data }) {
  const used = Math.round((data.spent / data.total) * 100);
  return <section className="card budget-card"><div className="card-head"><div><span className="section-kicker">BUDGET OVERVIEW</span><h2>Spending at a glance</h2></div><a href="#budget">Manage budget <span>→</span></a></div><div className="money-grid"><div><span>Total Budget</span><strong>{data.total.toLocaleString()} <em>EGP</em></strong></div><div><span>Spent</span><strong>{data.spent.toLocaleString()} <em>EGP</em></strong></div><div><span>Remaining</span><strong>{data.remaining.toLocaleString()} <em>EGP</em></strong></div></div><ProgressBar value={used} label={`${used}%`} /></section>;
}
