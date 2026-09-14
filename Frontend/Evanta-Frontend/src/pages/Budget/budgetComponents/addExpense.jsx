import closePopUp from "./closePopUp";
import axios from "axios";

async function addExpense(
  newExpense,
  eventId,
  setExpenses,
  setShowPopUp,
  setPopUpType,
) {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/budget/${eventId}`,
      newExpense,
    );

    setExpenses((prev) => [...prev, response.data.expense]);

    closePopUp(setShowPopUp, setPopUpType);
  } catch (err) {
    console.log(err.message);
  }
}

export default addExpense;
