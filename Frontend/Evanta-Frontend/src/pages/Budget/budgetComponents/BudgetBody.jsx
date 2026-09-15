import BudgetCards from "./BudgetCards";
import BudgetOverview from "./BudgetOverview";
import RecentExpenses from "./RecentExpenses";
import { useState, useEffect } from "react";
import axios from "axios";
import { useEvent } from "../../../context/EventContext";
import "../Budget.css";

const API_URL = "http://localhost:3000/api";

function BudgetBody() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [expenses, setExpenses] = useState([]);
  const { currentEvent } = useEvent();
  const eventId = currentEvent?._id;

  function handleAddExpense() {
    setShowPopUp(true);
    setPopUpType("add");
  }

  useEffect(() => {
    if (!eventId) return;

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${API_URL}/budget/${eventId}`);

        setExpenses(response.data.expenses || []);
      } catch (error) {
        console.error("Error fetching expenses:", error.response?.data);
      }
    };

    fetchExpenses();
  }, [eventId]);

  return (
    <div className="budget-page">
      <div className="container p-5">
        <div className="d-flex align-items-center mb-3">
          <h1 className="py-3">Budget</h1>

          <button className="budget-add-button" onClick={handleAddExpense}>
            Add Expense
          </button>
        </div>

        <div className="d-flex flex-column gap-3">
          <BudgetCards
            totalBudget={currentEvent?.budget || 0}
            spent={expenses.reduce(
              (total, expense) => total + Number(expense.amount),
              0,
            )}
          />

          <BudgetOverview expenses={expenses} />

          <RecentExpenses
            expenses={expenses}
            setExpenses={setExpenses}
            eventId={eventId}
            showPopUp={showPopUp}
            setShowPopUp={setShowPopUp}
            popUpType={popUpType}
            setPopUpType={setPopUpType}
          />
        </div>
      </div>
    </div>
  );
}

export default BudgetBody;
