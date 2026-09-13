export type EvantaEvent = {
  eventId: string;
  eventType: string;
  customEventType: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  expectedGuests: string;
  budget: string;
};

const STORAGE_KEY = "evanta_events";

export const EVENT_TYPES = [
  "Birthday",
  "Engagement",
  "Wedding",
  "Graduation",
  "Baby Shower",
];

export function isBrowser() {
  return typeof window !== "undefined";
}

export function getEvents(): EvantaEvent[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as EvantaEvent[]) : [];
  } catch {
    return [];
  }
}

function saveEvents(events: EvantaEvent[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function createId() {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Appends a new event, never overwriting the existing array. */
export function addEvent(event: Omit<EvantaEvent, "eventId">): EvantaEvent[] {
  const events = getEvents();
  const next = [...events, { ...event, eventId: createId() }];
  saveEvents(next);
  return next;
}

export function updateEvent(event: EvantaEvent): EvantaEvent[] {
  const next = getEvents().map((e) => (e.eventId === event.eventId ? event : e));
  saveEvents(next);
  return next;
}

export function deleteEvent(eventId: string): EvantaEvent[] {
  const next = getEvents().filter((e) => e.eventId !== eventId);
  saveEvents(next);
  return next;
}

export function displayType(event: EvantaEvent) {
  return event.eventType === "Other" && event.customEventType
    ? event.customEventType
    : event.eventType;
}

export function formatMoney(value: string) {
  const n = Number(value);
  if (!value || Number.isNaN(n)) return value || "—";
  return `${n.toLocaleString("en-US")} EGP`;
}

export function formatDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
