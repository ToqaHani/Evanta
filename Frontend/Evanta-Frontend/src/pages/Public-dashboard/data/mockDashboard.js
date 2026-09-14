export const mockDashboard = {
  event: {
    id: '123',
    name: 'Toka & Ahmed Engagement',
    type: 'Engagement',
    date: '2026-09-20',
    displayDate: '20 September 2026',
    location: 'Banha'
  },
  countdown: { days: 21, hours: 8, minutes: 34 },
  stats: {
    guests: { current: 78, total: 100, label: 'Confirmed' },
    budget: { spent: 22500, total: 30000, currency: 'EGP' },
    tasks: { done: 7, total: 12 },
    vendors: { booked: 4, total: 6 }
  },
  guestOverview: { confirmed: 78, maybe: 12, notComing: 10, noResponse: 0 },
  budgetOverview: { total: 30000, spent: 22500, remaining: 7500 },
  taskProgress: { completed: 7, total: 12 },
  upcoming: [
    { id: 1, title: 'Send Invitations', due: 'Due in 2 days', tone: 'orange' },
    { id: 2, title: 'Book Catering', due: 'Due in 4 days', tone: 'caramel' }
  ],
  vendors: [
    { id: 1, name: 'Venue', booked: true },
    { id: 2, name: 'Photographer', booked: true },
    { id: 3, name: 'Decorator', booked: true },
    { id: 4, name: 'Catering', booked: false }
  ],
  activity: [
    { id: 1, text: 'Toka confirmed RSVP', time: '2 minutes ago', icon: 'check' },
    { id: 2, text: 'Catering added', time: '1 hour ago', icon: 'plus' },
    { id: 3, text: 'Ahmed completed a task', time: '3 hours ago', icon: 'task' }
  ]
};
