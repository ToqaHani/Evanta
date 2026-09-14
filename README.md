# EVANTA

EVANTA is an event planning platform that helps users organize and manage events from one place.

Instead of using WhatsApp, Notes, Excel, and separate tools, EVANTA brings event details, guests, budget, tasks, vendors, invitations, and event planning into one platform.

## Features

* User registration and login
* Create and manage events
* Manage multiple events
* Dashboard for each event
* Smart Plan for event planning suggestions
* Guest management
* Budget and expense tracking
* Task management
* Vendor management
* Digital invitations
* Public invitation page
* RSVP through the public invitation
* QR code for invitations
* Shareable invitation link
* Event-specific data management

## Supported Events

EVANTA supports different event types such as

* Birthday
* Engagement
* Wedding
* Graduation
* Baby Shower

## Smart Plan

The Smart Plan helps users organize their event by selecting suitable planning options.

Users can review the suggested options and choose what they want to use.

The selected options can be saved with the event.

## Invitations

EVANTA provides a digital invitation system.

The user can

* Upload an invitation image
* Generate a public invitation link
* Generate a QR code
* Share the invitation
* Receive RSVP responses

Guests do not need an account to respond to an invitation.

They can enter their phone number and select their RSVP status.

Available RSVP statuses include

* Confirmed
* Maybe
* Not Coming

## Budget Management

The Budget page allows users to track event expenses.

Users can

* Add an expense
* Edit an expense
* Delete an expense
* View recent expenses
* Track spending for the current event

Each expense contains information such as

* Expense name
* Category
* Amount
* Date
* Event

## Vendors

Users can manage vendors related to their event.

Examples include

* Photographers
* Caterers
* Decorators
* Venues
* Other event services

Vendor information can include

* Name
* Type
* Phone number
* Price
* Date
* Status
* Notes

## Tasks

Users can organize event-related tasks and track their progress.

Tasks help divide the event preparation process into manageable steps.

## Guests

Users can manage their event guests and keep track of guest information and RSVP status.

Each event has its own guest data.

## Dashboard

The dashboard provides an overview of the current event.

It can display information related to

* Event details
* Budget
* Guests
* Tasks
* Vendors
* Invitations

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* Bootstrap
* React Bootstrap
* React Icons
* Axios
* QRCode React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* dotenv
* CORS

## Project Structure

```text
EVANTA
│
├── Frontend
│   └── Evanta-Frontend
│       ├── src
│       │   ├── components
│       │   ├── pages
│       │   │   ├── Landing
│       │   │   ├── Login&Register
│       │   │   ├── Create-Event
│       │   │   ├── Smart-Plan
│       │   │   ├── Public-dashboard
│       │   │   ├── Guests
│       │   │   ├── Budget
│       │   │   ├── Tasks
│       │   │   ├── Vendors
│       │   │   ├── Invitations
│       │   │   ├── Public-Invitation
│       │   │   └── My-Events
│       │   ├── context
│       │   └── App.jsx
│       │
│       └── package.json
│
└── Backend
    ├── config
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    ├── server.js
    ├── .env
    └── package.json
```

## Current Event

EVANTA uses a current event concept to connect the pages with the event selected by the user.

The selected event is stored on the frontend and used when pages request or update event-specific data.

This keeps data such as guests, expenses, vendors, tasks, and invitations connected to the correct event.

## Backend API

The backend provides API endpoints for the different parts of the application.

Examples include

```text
/api/auth
/api/events
/api/budget
/api/invitations
/api/guests
/api/tasks
/api/vendors
```

The exact endpoints depend on the implemented backend modules.

## Environment Variables

Create a `.env` file inside the Backend folder.

Example

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to GitHub.

Add it to `.gitignore`.

## Installation

Clone the repository

```bash
git clone <repository-url>
cd EVANTA
```

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

Open another terminal

```bash
cd Frontend/Evanta-Frontend
npm install
npm run dev
```

The frontend runs with Vite.

The backend runs as the Express server.

## Database

EVANTA uses MongoDB to store application data.

Mongoose handles the connection between the Node.js backend and MongoDB.

Event-related data uses the event ID to keep records connected to the correct event.

## Design

The project uses a warm color palette focused on

* Brown `#884a39`
* Caramel `#c38154`
* Peach `#ffc26f`
* Cream `#f9e0bb`
* Beige `#f8f3ea`
* White `#fdfaf5`
* Dark Brown `#2b2522`

The interface focuses on simple navigation and clear event management.

## Team

EVANTA was developed as a team project.

The project covers frontend development, backend development, database integration, API development, authentication, event management, and UI design.

## Future Improvements

Possible future improvements include

* AI-based event recommendations
* Automatic budget suggestions
* Vendor recommendations
* More RSVP statistics
* Event analytics
* Notification system
* Cloud image storage
* Deployment
* Mobile application

## License

This project was created for educational and development purposes.
