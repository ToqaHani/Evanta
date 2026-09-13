import { Link } from "react-router-dom";
import "../Landing.css";

const OCCASIONS = [
  { label: "Weddings", icon: "rings" },
  { label: "Birthdays", icon: "cake" },
  { label: "Engagements", icon: "ring" },
  { label: "Celebrations", icon: "toast" },
  { label: "Baby Showers", icon: "stroller" },
  { label: "Gift Days", icon: "gift" },
];

const FEATURES = [
  {
    title: "Guest Management",
    desc: "Build your guest list, track RSVPs and seating in one calm, organized space.",
    icon: "guests",
  },
  {
    title: "Budget Tracking",
    desc: "Set a budget, log every expense, and see exactly where your money is going.",
    icon: "budget",
  },
  {
    title: "Task Management",
    desc: "A shared checklist that keeps you, your partner and your vendors in sync.",
    icon: "tasks",
  },
  {
    title: "Vendor Management",
    desc: "Compare, book and message vendors — venues, caterers, photographers — from one place.",
    icon: "vendor",
  },
  {
    title: "Digital Invitations",
    desc: "Send elegant digital invites with QR codes and real-time RSVP tracking.",
    icon: "invite",
  },
  {
    title: "Smart Plan Engine",
    desc: "Get tailored budget, timeline and vendor suggestions you can accept, edit or skip.",
    icon: "smart",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Tell us the occasion",
    desc: "Wedding, birthday, engagement or shower — set the date, guest count and vibe.",
  },
  {
    n: "02",
    title: "Let Evanta suggest a plan",
    desc: "Our smart engine drafts a budget, task list and vendor shortlist in seconds.",
  },
  {
    n: "03",
    title: "Refine and celebrate",
    desc: "Adjust anything you like, invite your guests, and watch the countdown with ease.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Planning my wedding felt like a part-time job — until Evanta turned it into an evening ritual with coffee.",
    name: "Nour A.",
    role: "Bride, Cairo",
  },
  {
    quote:
      "The vendor comparisons alone saved us three weeks of back-and-forth calls.",
    name: "Karim & Mai",
    role: "Engagement Party",
  },
  {
    quote:
      "My daughter's baby shower looked professionally styled and I didn't touch a spreadsheet once.",
    name: "Salma H.",
    role: "Baby Shower Host",
  },
];

function Icon({ name }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "guests":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <path d="M2 20c0-3 2.5-5 6-5s6 2 6 5" />
          <path d="M12 20c0-3 2.5-5 6-5s4 2 4 5" />
        </svg>
      );
    case "budget":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18" />
          <circle cx="7" cy="14" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tasks":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "vendor":
      return (
        <svg {...common}>
          <path d="M3 9l1.5-5h15L21 9" />
          <path d="M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "invite":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "smart":
      return (
        <svg {...common}>
          <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
          <path d="M19 14l.8 1.8L21.5 16.5l-1.7.8L19 19l-.8-1.7-1.7-.8 1.7-.7L19 14z" />
        </svg>
      );
    case "rings":
      return (
        <svg {...common}>
          <circle cx="9" cy="14" r="4.2" />
          <circle cx="15" cy="14" r="4.2" />
        </svg>
      );
    case "cake":
      return (
        <svg {...common}>
          <path d="M12 3v3" />
          <path d="M4 21v-7a3 3 0 013-3h10a3 3 0 013 3v7z" />
          <path d="M4 17h16" />
        </svg>
      );
    case "ring":
      return (
        <svg {...common}>
          <circle cx="12" cy="15" r="5" />
          <path d="M9.5 10l2.5-6 2.5 6" />
        </svg>
      );
    case "toast":
      return (
        <svg {...common}>
          <path d="M7 3l3 5-5 8a2.2 2.2 0 003.8 2.2l5-8" />
          <path d="M17 3l-3 5 5 8a2.2 2.2 0 01-3.8 2.2l-5-8" />
        </svg>
      );
    case "stroller":
      return (
        <svg {...common}>
          <path d="M4 9c4-4 12-4 14 2" />
          <circle cx="8" cy="19" r="1.6" />
          <circle cx="16" cy="19" r="1.6" />
          <path d="M4 9l1 8h14" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <rect x="4" y="9" width="16" height="11" rx="1.5" />
          <path d="M4 13h16" />
          <path d="M12 9v11" />
          <path d="M12 9c-2-4-6-3-6 0s4 1.5 6 0z" />
          <path d="M12 9c2-4 6-3 6 0s-4 1.5-6 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Landing() {
  return (
    <>
      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero__arc" aria-hidden="true" />
        <div className="container hero__inner">
          <span className="eyebrow">Event Planner</span>
          <h1 className="hero__title">
            Plan Beautifully,
            <br />
            <span>Celebrate Fully.</span>
          </h1>
          <p className="hero__subtitle">
            Evanta brings your guest list, budget, vendors and to-dos into one
            elegant workspace — so every wedding, birthday, or engagement runs
            exactly as you imagined it.
          </p>
          <div className="hero__actions">
            <Link to="/register" className="btn btn-primary">
              Start planning free
            </Link>
            <a href="#features" className="btn btn-ghost">
              See how it works
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <strong>12k+</strong>
              <span>Events planned</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Average rating</span>
            </div>
            <div>
              <strong>320+</strong>
              <span>Trusted vendors</span>
            </div>
          </div>
        </div>
      </section>

      {/* OCCASIONS STRIP */}
      <section className="occasions">
        <div className="container occasions__row">
          {OCCASIONS.map((o) => (
            <div key={o.label} className="occasions__item">
              <span className="occasions__icon">
                <Icon name={o.icon} />
              </span>
              <span>{o.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What you get</span>
            <h2>Everything your celebration needs, quietly organized</h2>
            <div className="divider">
              <span className="line" />
              <span className="spark" />
              <span className="line" />
            </div>
          </div>

          <div className="features__grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <span className="feature-card__icon">
                  <Icon name={f.icon} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY / HOW IT WORKS */}
      <section id="why" className="steps">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Evanta</span>
            <h2>From first idea to last dance, in three steps</h2>
            <div className="divider">
              <span className="line" />
              <span className="spark" />
              <span className="line" />
            </div>
          </div>

          <div className="steps__grid">
            {STEPS.map((s) => (
              <div key={s.n} className="step-card">
                <span className="step-card__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Love Notes</span>
            <h2>Hosts who planned with ease</h2>
            <div className="divider">
              <span className="line" />
              <span className="spark" />
              <span className="line" />
            </div>
          </div>

          <div className="testimonials__grid">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="testimonial-card">
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <h2>Your celebration deserves a beautiful plan.</h2>
          <p>
            Create your free Evanta account and have your first smart plan ready
            in minutes.
          </p>
          <Link to="/register" className="btn btn-primary">
            Create your account
          </Link>
        </div>
      </section>
    </>
  );
}
