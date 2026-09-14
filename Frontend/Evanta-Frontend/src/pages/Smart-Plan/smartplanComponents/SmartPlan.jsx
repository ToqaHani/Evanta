import { useEffect, useState } from "react";
import "../SmartPlan.css";
import { useEvent } from "../../../context/EventContext";
import { saveSmartPlan } from "../../../components/My-Events/events";
const EVENT_TYPES = [
  {
    id: "baby-shower",
    name: "Baby Shower",
    icon: "👶",
    description: "Celebrate the arrival of your little one.",
  },
  {
    id: "engagement",
    name: "Engagement",
    icon: "💍",
    description: "Celebrate the beginning of your forever.",
  },
  {
    id: "wedding",
    name: "Wedding",
    icon: "💒",
    description: "Make your special day unforgettable.",
  },
  {
    id: "graduation",
    name: "Graduation",
    icon: "🎓",
    description: "Celebrate your achievement in style.",
  },
  {
    id: "birthday",
    name: "Birthday",
    icon: "🎂",
    description: "Make every birthday moment special.",
  },
];

const VENUES = [
  { name: "Hall", price: 5000 },
  { name: "Garden", price: 5000 },
  { name: "Rooftop", price: 6000 },
  { name: "Beach", price: 7000 },
  { name: "Home", price: 2500 },
];

const DECORATIONS = [
  { name: "Minimal", price: 3000 },
  { name: "Classic", price: 5000 },
  { name: "Luxury", price: 8000 },
  { name: "Themed", price: 6000 },
];

const CATERING = [
  { name: "Buffet", price: 2000 },
  { name: "Catering", price: 2500 },
  { name: "Drinks", price: 1000 },
  { name: "Desserts", price: 1500 },
];

const PHOTOGRAPHY = [
  { name: "Photographer", price: 2500 },
  { name: "Videographer", price: 3000 },
  { name: "Photo Booth", price: 2000 },
];

const ENTERTAINMENT = [
  { name: "DJ", price: 2500 },
  { name: "Live Music", price: 4000 },
  { name: "Kids Entertainment", price: 2000 },
  { name: "Games", price: 1200 },
];

const INVITATIONS = [
  { name: "Digital Invitation", price: 500 },
  { name: "Printed Invitations", price: 1500 },
];

const CAKE = [
  { name: "Custom Cake", price: 1500 },
  { name: "Cupcakes", price: 1000 },
  { name: "Dessert Table", price: 2000 },
];

const FLOWERS = [
  { name: "Bouquet", price: 1200 },
  { name: "Table Flowers", price: 1500 },
  { name: "Entrance Decoration", price: 1800 },
];

function SmartPlan() {
  const { currentEvent, setCurrentEvent } = useEvent();
  // =========================
  // EVENT INFORMATION
  // =========================

  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState(25000);

  // =========================
  // SERVICES
  // =========================

  const [venue, setVenue] = useState("");
  const [decoration, setDecoration] = useState("");

  const [catering, setCatering] = useState([]);
  const [photography, setPhotography] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [cake, setCake] = useState([]);
  const [flowers, setFlowers] = useState([]);

  // =========================
  // PAGE STATES
  // =========================

  const [error, setError] = useState("");
  const [showPlan, setShowPlan] = useState(false);

  // =========================
  // SELECT EVENT
  // =========================
  useEffect(() => {
    if (!currentEvent) return;

    setSelectedEvent(
      EVENT_TYPES.find((event) => event.name === currentEvent.type)?.id || "",
    );

    setEventDate(
      currentEvent.date
        ? new Date(currentEvent.date).toISOString().split("T")[0]
        : "",
    );

    setGuests(currentEvent.expectedGuests || "");
    setLocation(currentEvent.location || "");
    setBudget(currentEvent.budget || 25000);

    const plan = currentEvent.smartPlan;

    if (!plan) return;

    setVenue(plan.venue?.name || "");
    setDecoration(plan.decoration?.name || "");
    setCatering(plan.catering?.map((item) => item.name) || []);
    setPhotography(plan.photography?.map((item) => item.name) || []);
    setEntertainment(plan.entertainment?.map((item) => item.name) || []);
    setInvitations(plan.invitations?.map((item) => item.name) || []);
    setCake(plan.cake?.map((item) => item.name) || []);
    setFlowers(plan.flowers?.map((item) => item.name) || []);
  }, [currentEvent]);
  const handleEventSelect = (eventId) => {
    setSelectedEvent(eventId);
    setShowPlan(false);
    setError("");

    setTimeout(() => {
      document.getElementById("event-details")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // =========================
  // MULTI SELECT
  // =========================

  const toggleOption = (option, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(option)) {
      setSelectedItems(selectedItems.filter((item) => item !== option));
    } else {
      setSelectedItems([...selectedItems, option]);
    }

    setShowPlan(false);
    setError("");
  };

  // =========================
  // GET PRICE
  // =========================

  const getPrice = (data, name) => {
    const item = data.find((element) => element.name === name);
    return item ? item.price : 0;
  };

  // =========================
  // CALCULATE COST
  // =========================

  const calculateCost = () => {
    let total = 0;

    // Venue
    total += getPrice(VENUES, venue);

    // Decoration
    total += getPrice(DECORATIONS, decoration);

    // Catering
    catering.forEach((item) => {
      total += getPrice(CATERING, item);
    });

    // Photography
    photography.forEach((item) => {
      total += getPrice(PHOTOGRAPHY, item);
    });

    // Entertainment
    entertainment.forEach((item) => {
      total += getPrice(ENTERTAINMENT, item);
    });

    // Invitations
    invitations.forEach((item) => {
      total += getPrice(INVITATIONS, item);
    });

    // Cake
    cake.forEach((item) => {
      total += getPrice(CAKE, item);
    });

    // Flowers
    flowers.forEach((item) => {
      total += getPrice(FLOWERS, item);
    });

    // Guest-based catering estimate
    if (guests && Number(guests) > 0) {
      total += Number(guests) * 100;
    }

    return total;
  };

  const estimatedCost = calculateCost();

  // =========================
  // VALIDATION
  // =========================

  const validatePlan = () => {
    if (!selectedEvent) {
      return "Please choose your event type.";
    }

    if (!eventDate) {
      return "Please select your event date.";
    }

    if (!guests || Number(guests) < 1) {
      return "Please enter the number of guests.";
    }

    if (!location.trim()) {
      return "Please enter your event location.";
    }

    if (!venue) {
      return "Please choose a venue.";
    }

    if (!decoration) {
      return "Please choose a decoration style.";
    }

    const hasAdditionalService =
      catering.length > 0 ||
      photography.length > 0 ||
      entertainment.length > 0 ||
      invitations.length > 0 ||
      cake.length > 0 ||
      flowers.length > 0;

    if (!hasAdditionalService) {
      return "Please choose at least one additional service.";
    }

    return "";
  };

  // =========================
  // CREATE PLAN
  // =========================
  const createPlan = async () => {
    const validationError = validatePlan();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!currentEvent?._id) {
      setError("Please select an event first.");
      return;
    }

    const smartPlan = {
      venue: venue
        ? {
            name: venue,
            price: getPrice(VENUES, venue),
          }
        : null,

      decoration: decoration
        ? {
            name: decoration,
            price: getPrice(DECORATIONS, decoration),
          }
        : null,

      catering: catering.map((item) => ({
        name: item,
        price: getPrice(CATERING, item),
      })),

      photography: photography.map((item) => ({
        name: item,
        price: getPrice(PHOTOGRAPHY, item),
      })),

      entertainment: entertainment.map((item) => ({
        name: item,
        price: getPrice(ENTERTAINMENT, item),
      })),

      invitations: invitations.map((item) => ({
        name: item,
        price: getPrice(INVITATIONS, item),
      })),

      cake: cake.map((item) => ({
        name: item,
        price: getPrice(CAKE, item),
      })),

      flowers: flowers.map((item) => ({
        name: item,
        price: getPrice(FLOWERS, item),
      })),

      estimatedCost,
    };

    try {
      setError("");

      const updatedEvent = await saveSmartPlan(currentEvent._id, {
        date: eventDate,
        expectedGuests: Number(guests),
        location: location.trim(),
        budget: Number(budget),
        smartPlan,
      });

      setCurrentEvent(updatedEvent);

      setShowPlan(true);

      setTimeout(() => {
        document
          .getElementById("final-plan")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save smart plan.");
    }
  };

  // =========================
  // RESET PLAN
  // =========================

  const resetPlan = () => {
    setSelectedEvent("");
    setEventDate("");
    setGuests("");
    setLocation("");
    setBudget(25000);

    setVenue("");
    setDecoration("");

    setCatering([]);
    setPhotography([]);
    setEntertainment([]);
    setInvitations([]);
    setCake([]);
    setFlowers([]);

    setError("");
    setShowPlan(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // EDIT PLAN
  // =========================

  const editPlan = () => {
    setShowPlan(false);
    setError("");

    setTimeout(() => {
      document.getElementById("event-details")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // =========================
  // SMART SUGGESTION
  // =========================

  const getSmartSuggestion = () => {
    if (!guests) {
      return "Add your number of guests to get a more personalized recommendation.";
    }

    if (estimatedCost > budget) {
      return "Your current selections are above your budget. Try choosing a simpler decoration style or removing some optional services.";
    }

    if (Number(guests) >= 200) {
      return "For a large event, we recommend choosing a spacious venue and keeping the guest flow in mind.";
    }

    if (budget >= 50000) {
      return "Your budget gives you more flexibility. You can consider premium decoration, entertainment, or photography options.";
    }

    return "Your current selections are within your budget. Your plan is looking great!";
  };

  const selectedEventData = EVENT_TYPES.find(
    (event) => event.id === selectedEvent,
  );

  return (
    <div className="smart-plan-page">
      {/* ==================================================
          HERO
      ================================================== */}

      <section className="smart-plan-hero">
        <div className="hero-content">
          <p className="hero-small-title">EVANTA SMART PLANNING</p>

          <h1>
            Create Your
            <span>Smart Plan</span>
          </h1>

          <p className="hero-description">
            Plan your perfect event your way. Choose your occasion, tell us what
            you need, and create a personalized plan that fits your vision and
            budget.
          </p>

          <button
            className="start-planning-btn"
            onClick={() =>
              document.getElementById("event-selection")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Start Planning
          </button>
        </div>
      </section>

      {/* ==================================================
          STEP 1 - EVENT
      ================================================== */}

      <section className="event-selection" id="event-selection">
        <div className="section-heading">
          <p className="section-subtitle">STEP 1</p>

          <h2>What are you planning?</h2>

          <p className="section-description">
            Choose the type of event you want to create.
          </p>
        </div>

        <div className="event-cards">
          {EVENT_TYPES.map((event) => (
            <button
              key={event.id}
              className={`event-card ${
                selectedEvent === event.id ? "selected" : ""
              }`}
              onClick={() => handleEventSelect(event.id)}
            >
              <div className="event-icon">{event.icon}</div>

              <h3>{event.name}</h3>

              <p>{event.description}</p>

              <div className="select-circle">
                {selectedEvent === event.id ? "✓" : ""}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ==================================================
          STEP 2 - EVENT DETAILS
      ================================================== */}

      {selectedEvent && (
        <section className="planning-section" id="event-details">
          <div className="section-heading">
            <p className="section-subtitle">STEP 2</p>

            <h2>Tell us about your event</h2>

            <p className="section-description">
              Give us some basic information about your event.
            </p>
          </div>

          <div className="details-grid">
            <div className="input-group">
              <label htmlFor="event-date">Event Date</label>

              <input
                id="event-date"
                type="date"
                value={eventDate}
                onChange={(e) => {
                  setEventDate(e.target.value);
                  setError("");
                  setShowPlan(false);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="guests">Number of Guests</label>

              <input
                id="guests"
                type="number"
                min="1"
                placeholder="e.g. 100"
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                  setError("");
                  setShowPlan(false);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="location">Event Location</label>

              <input
                id="location"
                type="text"
                placeholder="Enter event location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setError("");
                  setShowPlan(false);
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          STEP 3 - SERVICES
      ================================================== */}

      {selectedEvent && (
        <section className="planning-section services-section">
          <div className="section-heading">
            <p className="section-subtitle">STEP 3</p>

            <h2>Build Your Event</h2>

            <p className="section-description">
              Select everything you need for your special event.
            </p>
          </div>

          {/* VENUE */}

          <ServiceGroup
            title="Venue"
            options={VENUES}
            selected={venue}
            onSelect={(option) => {
              setVenue(option);
              setShowPlan(false);
              setError("");
            }}
          />

          {/* DECORATION */}

          <ServiceGroup
            title="Decoration Style"
            options={DECORATIONS}
            selected={decoration}
            onSelect={(option) => {
              setDecoration(option);
              setShowPlan(false);
              setError("");
            }}
          />

          {/* CATERING */}

          <MultiServiceGroup
            title="Food & Drinks"
            options={CATERING}
            selected={catering}
            onToggle={(option) => toggleOption(option, catering, setCatering)}
          />

          {/* PHOTOGRAPHY */}

          <MultiServiceGroup
            title="Photography"
            options={PHOTOGRAPHY}
            selected={photography}
            onToggle={(option) =>
              toggleOption(option, photography, setPhotography)
            }
          />

          {/* ENTERTAINMENT */}

          <MultiServiceGroup
            title="Entertainment"
            options={ENTERTAINMENT}
            selected={entertainment}
            onToggle={(option) =>
              toggleOption(option, entertainment, setEntertainment)
            }
          />

          {/* INVITATIONS */}

          <MultiServiceGroup
            title="Invitations"
            options={INVITATIONS}
            selected={invitations}
            onToggle={(option) =>
              toggleOption(option, invitations, setInvitations)
            }
          />

          {/* CAKE */}

          <MultiServiceGroup
            title="Cake & Desserts"
            options={CAKE}
            selected={cake}
            onToggle={(option) => toggleOption(option, cake, setCake)}
          />

          {/* FLOWERS */}

          <MultiServiceGroup
            title="Flowers & Details"
            options={FLOWERS}
            selected={flowers}
            onToggle={(option) => toggleOption(option, flowers, setFlowers)}
          />
        </section>
      )}

      {/* ==================================================
          STEP 4 - BUDGET
      ================================================== */}

      {selectedEvent && (
        <section className="budget-section">
          <div className="section-heading">
            <p className="section-subtitle">STEP 4</p>

            <h2>Set Your Budget</h2>

            <p className="section-description">
              Choose the maximum amount you want to spend.
            </p>
          </div>

          <div className="budget-value">{budget.toLocaleString()} EGP</div>

          <input
            className="budget-slider"
            type="range"
            min="5000"
            max="100000"
            step="1000"
            value={budget}
            onChange={(e) => {
              setBudget(Number(e.target.value));
              setShowPlan(false);
              setError("");
            }}
          />

          <div className="budget-range">
            <span>5,000 EGP</span>
            <span>100,000 EGP</span>
          </div>
        </section>
      )}

      {/* ==================================================
          SMART SUGGESTIONS
      ================================================== */}

      {selectedEvent && (
        <section className="suggestions-section">
          <div className="suggestion-card">
            <div className="suggestion-icon">✨</div>

            <div className="suggestion-content">
              <h3>Smart Suggestions</h3>

              <p>{getSmartSuggestion()}</p>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          STEP 5 - SUMMARY
      ================================================== */}

      {selectedEvent && (
        <section className="summary-section" id="plan-summary">
          <div className="section-heading">
            <p className="section-subtitle">STEP 5</p>

            <h2>Review Your Plan</h2>

            <p className="section-description">
              Check your selections before creating your plan.
            </p>
          </div>

          <div className="summary-card">
            {/* HEADER */}

            <div className="summary-header">
              <div>
                <span>EVENT</span>

                <h3>{selectedEventData?.name}</h3>
              </div>

              <div className="summary-icon">{selectedEventData?.icon}</div>
            </div>

            {/* EVENT DETAILS */}

            <div className="summary-details">
              <div>
                <span>Date</span>

                <strong>{eventDate || "Not selected"}</strong>
              </div>

              <div>
                <span>Guests</span>

                <strong>{guests || "Not selected"}</strong>
              </div>

              <div>
                <span>Location</span>

                <strong>{location || "Not selected"}</strong>
              </div>
            </div>

            {/* SERVICES */}

            <div className="summary-services">
              <h3>Selected Services</h3>

              {venue && <SummaryItem title="Venue" value={venue} />}

              {decoration && (
                <SummaryItem title="Decoration" value={decoration} />
              )}

              {catering.map((item) => (
                <SummaryItem
                  key={`catering-${item}`}
                  title="Food & Drinks"
                  value={item}
                />
              ))}

              {photography.map((item) => (
                <SummaryItem
                  key={`photo-${item}`}
                  title="Photography"
                  value={item}
                />
              ))}

              {entertainment.map((item) => (
                <SummaryItem
                  key={`entertainment-${item}`}
                  title="Entertainment"
                  value={item}
                />
              ))}

              {invitations.map((item) => (
                <SummaryItem
                  key={`invitation-${item}`}
                  title="Invitations"
                  value={item}
                />
              ))}

              {cake.map((item) => (
                <SummaryItem
                  key={`cake-${item}`}
                  title="Cake & Desserts"
                  value={item}
                />
              ))}

              {flowers.map((item) => (
                <SummaryItem
                  key={`flowers-${item}`}
                  title="Flowers"
                  value={item}
                />
              ))}
            </div>

            {/* COST */}

            <div className="cost-box">
              <span>Estimated Cost</span>

              <strong>{estimatedCost.toLocaleString()} EGP</strong>

              <small
                className={
                  estimatedCost <= budget ? "cost-good" : "cost-warning"
                }
              >
                {estimatedCost <= budget
                  ? "✓ Within your budget"
                  : "⚠ Above your budget"}
              </small>
            </div>

            {/* ERROR */}

            {error && <div className="plan-error">⚠ {error}</div>}

            {/* CREATE */}

            <button className="create-plan-btn" onClick={createPlan}>
              Create My Smart Plan
            </button>
          </div>
        </section>
      )}

      {/* ==================================================
          FINAL PLAN
      ================================================== */}

      {showPlan && (
        <section className="final-plan-section" id="final-plan">
          <div className="final-plan-card">
            {/* TOP */}

            <div className="final-plan-top">
              <p>EVANTA</p>

              <span>YOUR SMART PLAN</span>
            </div>

            {/* TITLE */}

            <div className="final-plan-title">
              <span className="final-event-icon">
                {selectedEventData?.icon}
              </span>

              <h2>{selectedEventData?.name}</h2>

              <p>Your personalized event plan</p>
            </div>

            {/* DETAILS */}

            <div className="final-details">
              <div>
                <span>Date</span>

                <strong>{eventDate}</strong>
              </div>

              <div>
                <span>Guests</span>

                <strong>{guests}</strong>
              </div>

              <div>
                <span>Location</span>

                <strong>{location}</strong>
              </div>
            </div>

            {/* SERVICES */}

            <div className="final-services">
              <h3>Selected Services</h3>

              <FinalService title="Venue" value={venue} />

              <FinalService title="Decoration" value={decoration} />

              {catering.map((item) => (
                <FinalService
                  key={`final-catering-${item}`}
                  title="Food & Drinks"
                  value={item}
                />
              ))}

              {photography.map((item) => (
                <FinalService
                  key={`final-photo-${item}`}
                  title="Photography"
                  value={item}
                />
              ))}

              {entertainment.map((item) => (
                <FinalService
                  key={`final-entertainment-${item}`}
                  title="Entertainment"
                  value={item}
                />
              ))}

              {invitations.map((item) => (
                <FinalService
                  key={`final-invitation-${item}`}
                  title="Invitations"
                  value={item}
                />
              ))}

              {cake.map((item) => (
                <FinalService
                  key={`final-cake-${item}`}
                  title="Cake & Desserts"
                  value={item}
                />
              ))}

              {flowers.map((item) => (
                <FinalService
                  key={`final-flowers-${item}`}
                  title="Flowers"
                  value={item}
                />
              ))}
            </div>

            {/* FINAL COST */}

            <div className="final-cost">
              <span>Estimated Total</span>

              <strong>{estimatedCost.toLocaleString()} EGP</strong>

              <p
                className={
                  estimatedCost <= budget ? "final-good" : "final-warning"
                }
              >
                {estimatedCost <= budget
                  ? "✓ This plan fits your budget"
                  : "⚠ This plan is above your budget"}
              </p>
            </div>

            {/* BUTTONS */}

            <div className="final-actions">
              <button className="edit-plan-btn" onClick={editPlan}>
                Edit Plan
              </button>

              <button className="new-plan-btn" onClick={resetPlan}>
                Start Another Plan
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ======================================================
   SINGLE SELECT SERVICE
====================================================== */

function ServiceGroup({ title, options, selected, onSelect }) {
  return (
    <div className="service-group">
      <h3>{title}</h3>

      <div className="service-options">
        {options.map((option) => (
          <button
            key={option.name}
            type="button"
            className={`service-option ${
              selected === option.name ? "active" : ""
            }`}
            onClick={() => onSelect(option.name)}
          >
            <span>{option.name}</span>

            <small>{option.price.toLocaleString()} EGP</small>

            {selected === option.name && <b>✓</b>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ======================================================
   MULTI SELECT SERVICE
====================================================== */

function MultiServiceGroup({ title, options, selected, onToggle }) {
  return (
    <div className="service-group">
      <h3>{title}</h3>

      <div className="service-options">
        {options.map((option) => {
          const isSelected = selected.includes(option.name);

          return (
            <button
              key={option.name}
              type="button"
              className={`service-option ${isSelected ? "active" : ""}`}
              onClick={() => onToggle(option.name)}
            >
              <span>{option.name}</span>

              <small>{option.price.toLocaleString()} EGP</small>

              {isSelected && <b>✓</b>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ======================================================
   SUMMARY ITEM
====================================================== */

function SummaryItem({ title, value }) {
  return (
    <div className="summary-item">
      <span>{title}</span>

      <strong>✓ {value}</strong>
    </div>
  );
}

/* ======================================================
   FINAL SERVICE
====================================================== */

function FinalService({ title, value }) {
  return (
    <div className="final-service-row">
      <span>{title}</span>

      <strong>{value}</strong>
    </div>
  );
}

export default SmartPlan;
