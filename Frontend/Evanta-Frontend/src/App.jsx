import { Routes, Route } from 'react-router-dom'
import Navbar from "./pages/Landing/LandingComponents/Navbar";
import Landing from "./pages/Landing/LandingComponents/Landing";
import Footer from "./pages/Landing/LandingComponents/Footer";

import Login from "./pages/Login&Register/loginComponents/Login";
import Register from "./pages/Login&Register/loginComponents/Register";

import Dashboard from "./pages/Public-dashboard/Dashboard";
import GuestsBody from "./pages/Guests/GuestsComponents/GuestsBody";
import BudgetBody from "./pages/Budget/budgetComponents/BudgetBody";

import VendorsPage from "./pages/VendorsPage";
import InvitationBody from "./pages/invitations/invitationsComponents/InvitationBody";

function App() {
  <div className="app-shell">
    <main>
      <Routes>
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/create-event" element={/>/} /> */}
        {/* <Route path="/smart-plan" element={} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guests" element={<GuestsBody />} />
        <Route path="/budget" element={<BudgetBody />} />
        {/* <Route path="/tasks" element={/>/} /> */}
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/invitations" element={<InvitationBody />} />
        {/* <Route path="/my-events" element={/>/} /> */}
      </Routes>
    </main>
  </div>;
}
export default App;
