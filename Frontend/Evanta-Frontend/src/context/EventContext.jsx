import { createContext, useContext, useState } from "react";

const EventContext = createContext();
const CURRENT_EVENT_KEY = "evanta_current_event";

export function EventProvider({ children }) {
  const [currentEvent, setCurrentEvent] = useState(() => {
    const savedEvent = localStorage.getItem(CURRENT_EVENT_KEY);

    return savedEvent ? JSON.parse(savedEvent) : null;
  });

  const selectEvent = (event) => {
    setCurrentEvent(event);
    localStorage.setItem(CURRENT_EVENT_KEY, JSON.stringify(event));
  };

  return (
    <EventContext.Provider
      value={{
        currentEvent,
        setCurrentEvent: selectEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  return useContext(EventContext);
}
