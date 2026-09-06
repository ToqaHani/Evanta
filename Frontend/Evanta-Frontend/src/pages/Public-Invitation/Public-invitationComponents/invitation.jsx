import { useState } from "react";
import photo from '../../../assets/Beige And Gold Floral Wedding Invitation.png'
import { FaCircleCheck } from "react-icons/fa6";
function Invitation() {
  // بغير حالة ال geust على حسب اللي اختاره
  let [status, setStatus] = useState("Pending");
  //   بغير بيها لون الكلمة جوا المسدج
  let [statusColor, setStatusColor] = useState("var(--color-dark-brown)");
  //   بظهر بيها و بخفي المسدج اللي هتظهر
  let [showMessage, setShowMessage] = useState(false);
  // بخليه يغبر كل اللي فوق
  function handleClick(e) {
    setStatusColor(e.target.style.backgroundColor);
    setStatus(e.target.name);
    setShowMessage(true);
  }

  return (
    <>
      {showMessage && (
        <>
          <div className="page p-2">
            <div className="message">
              <FaCircleCheck
                size={"80px"}
                style={{ color: "var(--color-green)" }}
                className="my-2"
              />
              <h3 className="mt-2">Thank you!</h3>
              <p className="mt-2">
                Your response has been recorded as{" "}
                <span style={{ color: statusColor }}>{status}</span>
              </p>
              <button
                className="mt-3"
                onClick={() => setShowMessage(false)}
                style={{
                  backgroundColor: "var(--color-green)",
                  border: "1px solid var(--color-green)",
                }}
              >
                Great!
              </button>
            </div>
          </div>
        </>
      )}
      <div className="content m-5 p-2 p-sm-5 d-flex flex-column justify-content-center align-items-center">
        <img src={photo} alt="invitation" className="invitation-img" />
        <div className="d-flex flex-column flex-sm-row mt-4 gap-3 justify-content-center align-items-center">
          <button
            name="Confirmed"
            style={{
              backgroundColor: "var(--color-green)",
              border: "1px solid var(--color-green)",
            }}
            onClick={handleClick}
          >
            Yes, I'll be there!
          </button>
          <button
            name="Maybe"
            style={{
              backgroundColor: "var(--color-orange)",
              border: "1px solid var(--color-orange)",
            }}
            onClick={handleClick}
          >
            Maybe
          </button>
          <button
            name="Declined"
            style={{
              backgroundColor: "var(--color-red)",
              border: "1px solid var(--color-red)",
            }}
            onClick={handleClick}
          >
            Sorry, I can't.
          </button>
        </div>
      </div>
    </>
  );
}
export default Invitation;
