import "./sidebar.css";
import React from 'react';
import Icon from './Icons';

const links = [
  ['Dashboard', 'grid'], ['Guests', 'users'], ['Budget', 'wallet'], ['Tasks', 'checkSquare'], ['Vendors', 'briefcase'], ['Invitations', 'mail']
];

export default function Sidebar({ mobileOpen, onClose, active = 'Dashboard' }) {
  return <>
    <div className={`sidebar-backdrop ${mobileOpen ? 'show' : ''}`} onClick={onClose} />
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand"><img className="brand-logo" src="/assets/evanta-logo.png" alt="Evanta Event Planner" /></div>
      <div className="active-event">
        <div className="eyebrow">ACTIVE EVENT</div>
        <strong>Toka & Ahmed</strong>
        <span>Engagement</span>
        <span>20 Sep 2026</span>
        <button className="switch-event" type="button"><Icon name="repeat" size={15}/> Switch Event</button>
      </div>
      <nav className="nav-list" aria-label="Event navigation">
        {links.map(([label, icon]) => <a key={label} className={`nav-item ${active === label ? 'active' : ''}`} href={`#${label.toLowerCase()}`} onClick={onClose}><Icon name={icon}/><span>{label}</span></a>)}
      </nav>
      <div className="nav-divider" />
      <a className="nav-item" href="#my-events" onClick={onClose}><Icon name="calendar"/><span>My Events</span></a>
      <a className="nav-item" href="#settings" onClick={onClose}><Icon name="activity"/><span>Event Settings</span></a>
      <div className="sidebar-spacer" />
      <a className="nav-item" href="#profile" onClick={onClose}><Icon name="user"/><span>Profile</span></a>
      <a className="nav-item logout" href="#logout" onClick={onClose}><Icon name="logout"/><span>Logout</span></a>
    </aside>
  </>;
}
