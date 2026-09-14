import axios from "axios";

export const EVENT_TYPES = [
    "Birthday",
    "Engagement",
    "Wedding",
    "Graduation",
    "Baby Shower",
    "Other",
];

export async function getEvents() {
    const token =
        localStorage.getItem("evantaToken") ||
        sessionStorage.getItem("evantaToken");

    if (!token) {
        throw new Error("User is not logged in");
    }

    const response = await axios.get(
        "http://localhost:3000/api/events",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
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

    return response.data.event;
}

export async function updateEvent(event) {
    const token =
        localStorage.getItem("evantaToken") ||
        sessionStorage.getItem("evantaToken");

    if (!token) {
        throw new Error("User is not logged in");
    }

    const eventData = {
        name: event.name ?? event.eventName,
        type:
            event.eventType === "Other"
                ? event.customEventType
                : event.type ?? event.eventType,
        date: event.date,
        time: event.time,
        location: event.location,
        expectedGuests: Number(event.expectedGuests),
        budget: Number(event.budget),
    };

    const response = await axios.put(
        `http://localhost:3000/api/events/${event._id}`,
        eventData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.event;
}

export async function deleteEvent(eventId) {
    const token =
        localStorage.getItem("evantaToken") ||
        sessionStorage.getItem("evantaToken");

    if (!token) {
        throw new Error("User is not logged in");
    }

    const response = await axios.delete(
        `http://localhost:3000/api/events/${eventId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.event;
}

export function displayType(event) {
    return event.type || "—";
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