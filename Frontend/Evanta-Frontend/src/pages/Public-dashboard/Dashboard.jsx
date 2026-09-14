import React, { useEffect, useMemo, useState } from "react";

import Icon from "./public-dashboard-components/Icons";
import StatCard from "./public-dashboard-components/StatCard";
import Countdown from "./public-dashboard-components/Countdown";
import GuestOverview from "./public-dashboard-components/GuestOverview";
import BudgetOverview from "./public-dashboard-components/BudgetOverview";
import TaskProgress from "./public-dashboard-components/TaskProgress";
import Upcoming from "./public-dashboard-components/Upcoming";
import Vendors from "./public-dashboard-components/Vendors";
import Activity from "./public-dashboard-components/Activity";
import DashboardSkeleton from "./public-dashboard-components/DashboardSkeleton";

import { getDashboard } from "./services/dashboardApi";
import { useEvent } from "../../context/EventContext";

import "./styles.css";

export default function Dashboard() {
  const { currentEvent } = useEvent();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const load = async () => {
    // No event selected
    if (!currentEvent?._id) {
      setData(null);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await getDashboard(currentEvent._id);

      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Dashboard loading error:", err);

      setError(
        err.message ||
          "We couldn't load the dashboard. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [currentEvent?._id]);

  // -----------------------------
  // SAFE PERCENTAGE CALCULATIONS
  // -----------------------------

  const guestPct = useMemo(() => {
    if (!data?.stats?.guests) return 0;

    const current = Number(data.stats.guests.current) || 0;
    const total = Number(data.stats.guests.total) || 0;

    if (total === 0) return 0;

    return Math.round((current / total) * 100);
  }, [data]);

  const budgetPct = useMemo(() => {
    if (!data?.stats?.budget) return 0;

    const spent = Number(data.stats.budget.spent) || 0;
    const total = Number(data.stats.budget.total) || 0;

    if (total === 0) return 0;

    return Math.round((spent / total) * 100);
  }, [data]);

  const taskPct = useMemo(() => {
    if (!data?.stats?.tasks) return 0;

    const done = Number(data.stats.tasks.done) || 0;
    const total = Number(data.stats.tasks.total) || 0;

    if (total === 0) return 0;

    return Math.round((done / total) * 100);
  }, [data]);

  const vendorPct = useMemo(() => {
    if (!data?.stats?.vendors) return 0;

    const booked = Number(data.stats.vendors.booked) || 0;
    const total = Number(data.stats.vendors.total) || 0;

    if (total === 0) return 0;

    return Math.round((booked / total) * 100);
  }, [data]);

  // -----------------------------
  // NO ACTIVE EVENT
  // -----------------------------

  if (!loading && !currentEvent?._id) {
    return (
      <div className="app-shell">
        <main className="main-content">
          <header className="topbar">
            <div className="breadcrumb">
              <span>My Events</span>
              <b>/</b>
              <strong>Dashboard</strong>
            </div>

            <div className="top-actions">
              <button className="icon-btn" title="Activity">
                <Icon name="activity" />
              </button>

              <button className="profile-btn">
                <span className="avatar">A</span>
                <span className="profile-name">Ahmed</span>
                <Icon name="chevron" size={15} />
              </button>
            </div>
          </header>

          <div className="error-state">
            <h2>No event selected</h2>

            <p>
              Please create an event or select one from My Events to view
              its dashboard.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>My Events</span>
            <b>/</b>
            <strong>Dashboard</strong>
          </div>

          <div className="top-actions">
            <button className="icon-btn" title="Activity">
              <Icon name="activity" />
            </button>

            <button className="profile-btn">
              <span className="avatar">A</span>
              <span className="profile-name">Ahmed</span>
              <Icon name="chevron" size={15} />
            </button>
          </div>
        </header>

        {/* LOADING */}
        {loading && !data && <DashboardSkeleton />}

        {/* FAILED */}
        {!loading && error && !data && (
          <div className="error-state">
            <h2>Something went wrong</h2>

            <p>{error}</p>

            <button className="primary-btn" onClick={load}>
              Try again
            </button>
          </div>
        )}

        {/* DASHBOARD DATA */}
        {data && (
          <>
            <section className="hero-card">
              <div className="hero-content">
                <span className="hero-badge">
                  <span />
                  ACTIVE EVENT
                </span>

                <h1>{data.event?.name || "Event"}</h1>

                <div className="event-meta">
                  <span>
                    <Icon name="calendar" size={16} />
                    {data.event?.type || "No event type"}
                  </span>

                  <span>
                    <Icon name="clock" size={16} />
                    {data.event?.displayDate || "No date"}
                  </span>

                  <span>
                    <Icon name="mapPin" size={16} />
                    {data.event?.location || "No location"}
                  </span>
                </div>

                <div className="hero-actions">
                  <button
                    className="secondary-btn"
                    onClick={() =>
                      alert(
                        "Event switcher will connect to the My Events page."
                      )
                    }
                  >
                    <Icon name="repeat" size={16} />
                    Switch Event
                  </button>

                  <button className="ghost-btn" onClick={load}>
                    <Icon name="activity" size={16} />
                    Refresh
                  </button>
                </div>
              </div>

              {data.event?.date && (
                <Countdown
                  date={`${data.event.date}T19:00:00`}
                />
              )}

              <div className="hero-decor decor-one" />
              <div className="hero-decor decor-two" />
            </section>

            {/* INLINE API ERROR */}
            {error && (
              <div className="inline-alert">
                <span>{error}</span>

                <button onClick={load}>
                  Retry
                </button>
              </div>
            )}

            <div className="updated">
              Live overview
              <span>•</span>
              Last synced{" "}
              {lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {/* QUICK STATS */}
            <section className="section-block">
              <div className="section-title">
                <div>
                  <span className="section-kicker">
                    QUICK STATS
                  </span>

                  <h2>At a glance</h2>
                </div>

                <span className="section-note">
                  Your event in numbers
                </span>
              </div>

              <div className="stats-grid">
                <StatCard
                  icon="users"
                  title="Guests"
                  value={`${
                    data.stats?.guests?.current || 0
                  } / ${
                    data.stats?.guests?.total || 0
                  }`}
                  subtitle={`${
                    data.stats?.guests?.label ||
                    "Confirmed"
                  } • ${guestPct}%`}
                  progress={guestPct}
                  className="guests"
                />

                <StatCard
                  icon="wallet"
                  title="Budget"
                  value={`${(
                    data.stats?.budget?.spent || 0
                  ).toLocaleString()} / ${(
                    data.stats?.budget?.total || 0
                  ).toLocaleString()}`}
                  subtitle={`${
                    data.stats?.budget?.currency ||
                    "EGP"
                  } • ${budgetPct}% used`}
                  progress={budgetPct}
                  className="budget"
                />

                <StatCard
                  icon="checkSquare"
                  title="Tasks"
                  value={`${
                    data.stats?.tasks?.done || 0
                  } / ${
                    data.stats?.tasks?.total || 0
                  }`}
                  subtitle={`${taskPct}% completed`}
                  progress={taskPct}
                  className="tasks"
                />

                <StatCard
                  icon="briefcase"
                  title="Vendors"
                  value={`${
                    data.stats?.vendors?.booked || 0
                  } / ${
                    data.stats?.vendors?.total || 0
                  }`}
                  subtitle={`${vendorPct}% booked`}
                  progress={vendorPct}
                  className="vendors"
                />
              </div>
            </section>

            {/* OVERVIEW */}
            <section className="dashboard-grid two-col">
              <GuestOverview
                data={data.guestOverview}
              />

              <BudgetOverview
                data={data.budgetOverview}
              />
            </section>

            {/* TASKS / UPCOMING / VENDORS */}
            <section className="dashboard-grid three-col">
              <TaskProgress
                data={data.taskProgress}
              />

              <Upcoming
                items={data.upcoming || []}
              />

              <Vendors
                items={data.vendors || []}
              />
            </section>

            {/* ACTIVITY */}
            <section className="dashboard-grid one-col">
              <Activity
                items={data.activity || []}
              />
            </section>

            <footer className="dashboard-footer">
              <Icon name="sparkle" size={15} />
              Evanta keeps you focused on the big day —
              you make the decisions, we keep the plan
              clear.
            </footer>
          </>
        )}
      </main>
    </div>
  );
}