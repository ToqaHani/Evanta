import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./pages/Landing/LandingComponents/Navbar";
import Landing from "./pages/Landing/LandingComponents/Landing";
import Footer from "./pages/Landing/LandingComponents/Footer";

import Login from "./pages/Login&Register/loginComponents/Login";
import Register from "./pages/Login&Register/loginComponents/Register";

import CreateEvent from "./pages/Create-Event/create-eventComponents/createEvent";
import SmartPlan from "./pages/Smart-Plan/smartplanComponents/SmartPlan";

import Dashboard from "./pages/Public-dashboard/Dashboard";

import GuestsBody from "./pages/Guests/GuestsComponents/GuestsBody";
import BudgetBody from "./pages/Budget/budgetComponents/BudgetBody";
import TasksBody from "./pages/Tasks/TasksComponent/TasksBody";
import VendorsPage from "./pages/Vendors/VendorsComponents/VendorsPage";

import InvitationBody from "./pages/invitations/invitationsComponents/InvitationBody";
import MyEvents from "./pages/My-Events/My-EventsComponents/MyEvents";

import Invitation from "./pages/Public-Invitation/Public-invitationComponents/invitation";

import Sidebar from "./components/public-sidebar/Sidebar";

const workspaceRoutes = [
  "/dashboard",
  "/guests",
  "/budget",
  "/tasks",
  "/vendors",
  "/invitations",
  "/my-events",
];

function App() {
  const location = useLocation();

  const showSidebar = workspaceRoutes.some(
    (path) =>
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
  );

  return (
    <div className="app-shell">
      {showSidebar && <Sidebar />}

      <main
        className={
          showSidebar
            ? "workspace-main"
            : "public-main"
        }
      >
        <Routes>
          {/* LANDING */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Landing />
                <Footer />
              </>
            }
          />

          {/* AUTH */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* EVENT CREATION */}
          <Route
            path="/create-event"
            element={<CreateEvent />}
          />

          <Route
            path="/smart-plan"
            element={<SmartPlan />}
          />

          {/* EVENT WORKSPACE */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/guests"
            element={<GuestsBody />}
          />

          <Route
            path="/budget"
            element={<BudgetBody />}
          />

          <Route
            path="/tasks"
            element={<TasksBody />}
          />

          <Route
            path="/vendors"
            element={<VendorsPage />}
          />

          <Route
            path="/invitations"
            element={<InvitationBody />}
          />

          <Route
            path="/my-events"
            element={<MyEvents />}
          />

          {/* PUBLIC INVITATION */}
          <Route
            path="/public-invitation/:eventId"
            element={<Invitation />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;