import React, { useEffect, useMemo, useState } from 'react';
import Icon from './public-dashboard-components/Icons';
import StatCard from './public-dashboard-components/StatCard';
import Countdown from './public-dashboard-components/Countdown';
import GuestOverview from './public-dashboard-components/GuestOverview';
import BudgetOverview from './public-dashboard-components/BudgetOverview';
import TaskProgress from './public-dashboard-components/TaskProgress';
import Upcoming from './public-dashboard-components/Upcoming';
import Vendors from './public-dashboard-components/Vendors';
import Activity from './public-dashboard-components/Activity';
import DashboardSkeleton from './public-dashboard-components/DashboardSkeleton';
import { getDashboard } from './services/dashboardApi';
import './styles.css';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const load = async () => {
    setLoading(true); setError('');
    try { const result = await getDashboard('123'); setData(result); setLastUpdated(new Date()); }
    catch (err) { setError('We couldn’t load the dashboard. Please try again.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const budgetPct = useMemo(() => data ? Math.round((data.stats.budget.spent / data.stats.budget.total) * 100) : 0, [data]);
  const taskPct = useMemo(() => data ? Math.round((data.stats.tasks.done / data.stats.tasks.total) * 100) : 0, [data]);

  return <div className="app-shell">
    <main className="main-content">
      <header className="topbar">
        
        <div className="breadcrumb"><span>My Events</span><b>/</b><strong>Dashboard</strong></div>
        <div className="top-actions"><button className="icon-btn" title="Activity"><Icon name="activity"/></button><button className="profile-btn"><span className="avatar">A</span><span className="profile-name">Ahmed</span><Icon name="chevron" size={15}/></button></div>
      </header>
      {loading && !data ? <DashboardSkeleton /> : error && !data ? <div className="error-state"><h2>Something went wrong</h2><p>{error}</p><button className="primary-btn" onClick={load}>Try again</button></div> : data && <>
        <section className="hero-card">
          <div className="hero-content"><span className="hero-badge"><span /> ACTIVE EVENT</span><h1>{data.event.name}</h1><div className="event-meta"><span><Icon name="calendar" size={16}/>{data.event.type}</span><span><Icon name="clock" size={16}/>{data.event.displayDate}</span><span><Icon name="mapPin" size={16}/>{data.event.location}</span></div><div className="hero-actions"><button className="secondary-btn" onClick={() => alert('Event switcher will connect to the My Events page.')}><Icon name="repeat" size={16}/> Switch Event</button><button className="ghost-btn" onClick={load}><Icon name="activity" size={16}/> Refresh</button></div></div>
          <Countdown date={`${data.event.date}T19:00:00`} />
          <div className="hero-decor decor-one"/><div className="hero-decor decor-two"/>
        </section>
        {error && <div className="inline-alert"><span>{error}</span><button onClick={load}>Retry</button></div>}
        <div className="updated">Live overview <span>•</span> Last synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <section className="section-block"><div className="section-title"><div><span className="section-kicker">QUICK STATS</span><h2>At a glance</h2></div><span className="section-note">Your event in numbers</span></div><div className="stats-grid">
          <StatCard icon="users" title="Guests" value={`${data.stats.guests.current} / ${data.stats.guests.total}`} subtitle={`${data.stats.guests.label} • ${Math.round(data.stats.guests.current / data.stats.guests.total * 100)}%`} progress={Math.round(data.stats.guests.current / data.stats.guests.total * 100)} className="guests"/>
          <StatCard icon="wallet" title="Budget" value={`${data.stats.budget.spent.toLocaleString()} / ${data.stats.budget.total.toLocaleString()}`} subtitle={`${data.stats.budget.currency} • ${budgetPct}% used`} progress={budgetPct} className="budget"/>
          <StatCard icon="checkSquare" title="Tasks" value={`${data.stats.tasks.done} / ${data.stats.tasks.total}`} subtitle={`${taskPct}% completed`} progress={taskPct} className="tasks"/>
          <StatCard icon="briefcase" title="Vendors" value={`${data.stats.vendors.booked} / ${data.stats.vendors.total}`} subtitle={`${Math.round(data.stats.vendors.booked / data.stats.vendors.total * 100)}% booked`} progress={Math.round(data.stats.vendors.booked / data.stats.vendors.total * 100)} className="vendors"/>
        </div></section>
        <section className="dashboard-grid two-col"><GuestOverview data={data.guestOverview}/><BudgetOverview data={data.budgetOverview}/></section>
        <section className="dashboard-grid three-col"><TaskProgress data={data.taskProgress}/><Upcoming items={data.upcoming}/><Vendors items={data.vendors}/></section>
        <section className="dashboard-grid one-col"><Activity items={data.activity}/></section>
        <footer className="dashboard-footer"><Icon name="sparkle" size={15}/> Evanta keeps you focused on the big day — you make the decisions, we keep the plan clear.</footer>
      </>}
    </main>
  </div>;
}
