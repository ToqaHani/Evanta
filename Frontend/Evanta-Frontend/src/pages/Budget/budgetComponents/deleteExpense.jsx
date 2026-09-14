import closePopUp from "./closePopUp";
import axios from "axios";
async function deleteExpense(expense, setExpenses, setShowPopUp, setPopUpType) {
  try {
    await axios.delete(`http://localhost:3000/api/budget/${expense._id}`);
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((item) => item._id !== expense._id);
    });
    closePopUp(setShowPopUp, setPopUpType);
  } catch (err) {
    console.log(err.message);
  }
}
export default deleteExpense;
