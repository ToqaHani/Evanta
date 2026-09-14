import { useState } from "react";
import { useEvent } from "../../../context/EventContext";
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
  const { currentEvent } = useEvent();

  const smartPlan = currentEvent?.smartPlan;

  const categoryInfo = [
    {
      key: "venue",
      label: "Venue",
      value: smartPlan?.venue,
    },
    {
      key: "decoration",
      label: "Decoration",
      value: smartPlan?.decoration,
    },
    {
      key: "catering",
      label: "Food & Drinks",
      value: smartPlan?.catering,
    },
    {
      key: "photography",
      label: "Photography",
      value: smartPlan?.photography,
    },
    {
      key: "entertainment",
      label: "Entertainment",
      value: smartPlan?.entertainment,
    },
    {
      key: "invitations",
      label: "Invitations",
      value: smartPlan?.invitations,
    },
    {
      key: "cake",
      label: "Cake & Desserts",
      value: smartPlan?.cake,
    },
    {
      key: "flowers",
      label: "Flowers",
      value: smartPlan?.flowers,
    },
  ];

  const categories = categoryInfo.filter(({ value }) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value;
  });

  const [editedExpense, setEditedExpense] = useState(expense);
  const [showError, setShowError] = useState(false);

  const [newExpense, setNewExpense] = useState({
    name: "",
    category: categories[0]?.key || "",
    amount: "",
    date: "",
  });

  return (
    <div className="page p-2">
      <div className="message">
        {/* EDIT */}
        {popUpType === "edit" && (
          <div className="d-flex flex-column gap-3 align-items-start">
            <h2>Edit Expense:</h2>

            <div className="d-flex flex-column gap-3">
              {/* Name */}
              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="name">Name</label>

                <input
                  type="text"
                  id="name"
                  value={editedExpense.name}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      name: e.target.value,
                    })
                  }
                />

                {showError && !editedExpense.name && (
                  <small className="text-danger">This field is required</small>
                )}
              </div>

              {/* Category */}
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
                  {categories.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
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

                {showError && !editedExpense.amount && (
                  <small className="text-danger">This field is required</small>
                )}
              </div>

              {/* Date */}
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

                {showError && !editedExpense.date && (
                  <small className="text-danger">This field is required</small>
                )}
              </div>

              {/* Buttons */}
              <div className="d-flex">
                <button
                  style={{
                    backgroundColor: "var(--color-green)",
                    border: "1px solid var(--color-green)",
                  }}
                  onClick={() => {
                    if (
                      !editedExpense.name ||
                      !editedExpense.amount ||
                      !editedExpense.date
                    ) {
                      setShowError(true);
                      return;
                    }

                    editExpense(
                      editedExpense,
                      setExpenses,
                      setShowPopUp,
                      setPopUpType,
                    );
                  }}
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

        {/* DELETE */}
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

        {/* ADD */}
        {popUpType === "add" && (
          <div className="d-flex flex-column gap-3 align-items-start">
            <h2>Add Expense:</h2>

            <div className="d-flex flex-column gap-3">
              {/* Name */}
              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="name">Name</label>

                <input
                  type="text"
                  id="name"
                  placeholder="e.g. Book Venue"
                  value={newExpense.name}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      name: e.target.value,
                    })
                  }
                />

                {showError && !newExpense.name && (
                  <small className="text-danger">This field is required</small>
                )}
              </div>

              {/* Category */}
              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="category">Category</label>

                <select
                  name="category"
                  id="category"
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      category: e.target.value,
                    })
                  }
                >
                  {categories.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="amount">Amount</label>

                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      amount: e.target.value,
                    })
                  }
                />

                {showError && !newExpense.amount && (
                  <small className="text-danger">This field is required</small>
                )}
              </div>

              {/* Date */}
              <div className="d-flex flex-column gap-1 align-items-start">
                <label htmlFor="date">Date</label>

                <input
                  type="date"
                  name="date"
                  id="date"
                  value={newExpense.date}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      date: e.target.value,
                    })
                  }
                />

                {showError && !newExpense.date && (
                  <small className="text-danger">This field is required</small>
                )}
              </div>

              {/* Buttons */}
              <div className="d-flex">
                <button
                  style={{
                    backgroundColor: "var(--color-green)",
                    border: "1px solid var(--color-green)",
                  }}
                  onClick={() => {
                    if (
                      !newExpense.name ||
                      !newExpense.amount ||
                      !newExpense.date
                    ) {
                      setShowError(true);
                      return;
                    }

                    addExpense(
                      newExpense,
                      eventId,
                      setExpenses,
                      setShowPopUp,
                      setPopUpType,
                    );
                  }}
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
