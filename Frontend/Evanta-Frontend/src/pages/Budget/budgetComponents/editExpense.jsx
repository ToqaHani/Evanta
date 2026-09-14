import closePopUp from "./closePopUp";
import axios from "axios";

async function editExpense(
  editedExpense,
  setExpenses,
  setShowPopUp,
  setPopUpType,
) {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/budget/${editedExpense._id}`,
      editedExpense,
    );

    setExpenses((prev) =>
      prev.map((expense) =>
        expense._id === editedExpense._id
          ? response.data.expense
          : expense,
      ),
    );

    closePopUp(setShowPopUp, setPopUpType);
  } catch (err) {
    console.log(err.message);
  }
}

export default editExpense;