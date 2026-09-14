import closePopUp from "./closePopUp";
import axios from "axios";
async function editExpense(editedExpense, setShowPopUp, setPopUpType) {
  try {
    await axios.put(
      `http://localhost:3000/api/budget/${editedExpense._id}`,
      editedExpense,
    );
    closePopUp(setShowPopUp, setPopUpType);
  } catch (err) {
    console.log(err.message);
  }
}
export default editExpense;
