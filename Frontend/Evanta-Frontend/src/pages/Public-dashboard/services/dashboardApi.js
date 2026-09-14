const API_URL = "http://localhost:3000/api";

export const getDashboard = async (eventId) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  try {
    const response = await fetch(
      `${API_URL}/events/${eventId}/dashboard`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(
        errorData.message || "Failed to load dashboard data"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Dashboard API error:", error);
    throw error;
  }
};