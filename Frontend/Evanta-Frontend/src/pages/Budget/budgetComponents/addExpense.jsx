import closePopUp from "./closePopUp";
import axios from "axios";
async function addExpense(newExpense, eventId, setShowPopUp, setPopUpType) {
  try {
    await axios.post(`http://localhost:3000/api/budget/${eventId}`, newExpense);
    closePopUp(setShowPopUp, setPopUpType);
  } catch (err) {
    console.log(err.message);
  }
}
export default addExpense;
