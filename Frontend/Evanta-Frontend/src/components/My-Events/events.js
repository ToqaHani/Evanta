import axios from "axios";

const STORAGE_KEY = "evanta_events";

export const EVENT_TYPES = [
    "Birthday",
    "Engagement",
    "Wedding",
    "Graduation",
    "Baby Shower",
    "Other",
];

export function isBrowser() {
    return typeof window !== "undefined";
}

export function getEvents() {
    if (!isBrowser()) return [];

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);

        if (!raw) return [];

        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveEvents(events) {
    if (!isBrowser()) return;

    window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(events)
    );
}

export function createId() {
    return `evt_${Date.now().toString(36)}_${Math.random()
        .toString(36)
        .slice(2, 8)}`;
}

export async function addEvent(event) {
    const token =
        localStorage.getItem("evantaToken") ||
        sessionStorage.getItem("evantaToken");

    if (!token) {
        throw new Error("User is not logged in");
    }

    const eventData = {
        name: event.eventName,
        type:
            event.eventType === "Other"
                ? event.customEventType
                : event.eventType,
        date: event.date,
        time: event.time,
        location: event.location,
        expectedGuests: Number(event.expectedGuests),
        budget: Number(event.budget),
    };

    const response = await axios.post(
        "http://localhost:3000/api/events",
        eventData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export function updateEvent(event) {
    const next = getEvents().map((item) =>
        item.eventId === event.eventId ? event : item
    );

    saveEvents(next);

    return next;
}

export function deleteEvent(eventId) {
    const next = getEvents().filter(
        (item) => item.eventId !== eventId
    );

    saveEvents(next);

    return next;
}

export function displayType(event) {
    return event.eventType === "Other" && event.customEventType
        ? event.customEventType
        : event.eventType;
}

export function formatMoney(value) {
    const number = Number(value);

    if (!value || Number.isNaN(number)) {
        return value || "—";
    }

    return `${number.toLocaleString("en-US")} EGP`;
}

export function formatDate(value) {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}