import BudgetCards from "./BudgetCards";
import BudgetOverview from "./BudgetOverview";
import RecentExpenses from "./RecentExpenses";
import { useState } from "react";
function BudgetBody() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [expenses, setExpenses] = useState([]);
  function handleAddExpense() {
    setShowPopUp(true);
    setPopUpType("add");
  }
  return (
    <>
      <div className="container p-5">
        <div className="d-flex align-items-center mb-3">
          <h1 className="py-3">Budget</h1>

          <button
            style={{
              marginLeft: "auto",
              marginRight: 0,
            }}
            onClick={handleAddExpense}
          >
            Add Expense
          </button>
        </div>
        <div className="d-flex flex-column gap-3">
          <BudgetCards />
          <BudgetOverview />
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
    </>
  );
}
export default BudgetBody;
