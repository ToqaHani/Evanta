import { mockDashboard } from '../data/mockDashboard';


export async function getDashboard(eventId = '123', { signal } = {}) {
  const useMock = import.meta.env.VITE_USE_MOCK !== 'false';

  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return { ...mockDashboard, event: { ...mockDashboard.event, id: eventId } };
  }

  const response = await fetch(`/api/events/${eventId}/dashboard`, {
    headers: { Accept: 'application/json' },
    signal
  });

  if (!response.ok) {
    throw new Error(`Dashboard API returned ${response.status}`);
  }

  return response.json();
}
