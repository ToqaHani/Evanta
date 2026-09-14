import { useState } from "react";
import addExpense from "./addExpense";
import closePopUp from "./closePopUp";
import deleteExpense from "./deleteExpense";
import editExpense from "./editExpense";

function ExpensePopUp({
  expense,
  setExpenses,
  eventId,
  popUpType,
  setShowPopUp,
  setPopUpType,
}) {
  let [editedExpense, setEditedExpense] = useState(expense);
  let [newExpense, setNewExpense] = useState({
    name: "",
    category: "venue",
    amount: "",
    date: "",
  });
  return (
    <div className="page p-2">
      <div className="message">
        {popUpType === "edit" && (
          <div className="d-flex flex-column gap-3 align-items-start">
            <h2>Edit Expense:</h2>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={editedExpense.name}
                  onChange={(e) =>
                    setEditedExpense({ ...editedExpense, name: e.target.value })
                  }
                />
              </div>

              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  value={editedExpense.category}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="venue">Venue</option>
                  <option value="food">Food</option>
                </select>
              </div>

              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={editedExpense.amount}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      amount: e.target.value,
                    })
                  }
                />
              </div>

              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={editedExpense.date}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex">
                <button
                  style={{
                    backgroundColor: "var(--color-green)",
                    border: "1px solid var(--color-green)",
                  }}
                  onClick={() =>
                    editExpense(editedExpense, setShowPopUp, setPopUpType)
                  }
                >
                  Edit
                </button>
                <button
                  style={{
                    backgroundColor: "var(--color-red)",
                    border: "1px solid var(--color-red)",
                  }}
                  onClick={() => closePopUp(setShowPopUp, setPopUpType)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {popUpType === "delete" && (
          <div className="d-flex flex-column gap-3">
            <h4>Are you sure you want to delete this Expense?</h4>
            <div className="d-flex">
              <button
                style={{
                  backgroundColor: "var(--color-green)",
                  border: "1px solid var(--color-green)",
                }}
                onClick={() =>
                  deleteExpense(
                    expense,
                    setExpenses,
                    setShowPopUp,
                    setPopUpType,
                  )
                }
              >
                YES
              </button>
              <button
                style={{
                  backgroundColor: "var(--color-red)",
                  border: "1px solid var(--color-red)",
                }}
                onClick={() => closePopUp(setShowPopUp, setPopUpType)}
              >
                NO
              </button>
            </div>
          </div>
        )}
        {popUpType === "add" && (
          <div className="d-flex flex-column gap-3 align-items-start">
            <h2>Add Expense:</h2>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g. Book Venue"
                  value={newExpense.name}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, name: e.target.value })
                  }
                />
              </div>

              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, category: e.target.value })
                  }
                >
                  <option value="venue">Venue</option>
                  <option value="food">Food</option>
                </select>
              </div>

              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: e.target.value })
                  }
                />
              </div>

              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={newExpense.date}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, date: e.target.value })
                  }
                />
              </div>
              <div className="d-flex">
                <button
                  style={{
                    backgroundColor: "var(--color-green)",
                    border: "1px solid var(--color-green)",
                  }}
                  onClick={() => addExpense(newExpense,eventId,setShowPopUp, setPopUpType)}
                >
                  Add
                </button>
                <button
                  style={{
                    backgroundColor: "var(--color-red)",
                    border: "1px solid var(--color-red)",
                  }}
                  onClick={() => closePopUp(setShowPopUp, setPopUpType)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default ExpensePopUp;
