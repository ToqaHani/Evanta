import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import ExpensePopUp from "./expensePopUp";
import { useState } from "react";
function RecentExpenses({
  expenses,
  setExpenses,
  eventId,
  showPopUp,
  setShowPopUp,
  popUpType,
  setPopUpType,
}) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  function handleEditExpense(expense) {
    setSelectedExpense(expense);
    setShowPopUp(true);
    setPopUpType("edit");
  }

  function handleDeleteExpense(expense) {
    setSelectedExpense(expense);
    setShowPopUp(true);
    setPopUpType("delete");
  }

  return (
    <>
      {showPopUp && (
        <ExpensePopUp
          expense={selectedExpense}
          setExpenses={setExpenses}
          eventId={eventId}
          popUpType={popUpType}
          setShowPopUp={setShowPopUp}
          setPopUpType={setPopUpType}
        />
      )}
      <div className="content p-4">
        <h5 className="mb-3">Recent Expenses</h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {expenses.length ? (
                expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>{expense.name}</td>
                    <td>{expense.category}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.date}</td>
                    <td className="d-flex p-3 gap-2">
                      <FaPenToSquare
                        size={20}
                        onClick={() => handleEditExpense(expense)}
                      />
                      <FaTrash
                        size={20}
                        onClick={() => handleDeleteExpense(expense)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RecentExpenses;
