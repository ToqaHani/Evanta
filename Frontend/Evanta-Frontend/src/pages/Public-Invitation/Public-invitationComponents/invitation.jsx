import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCircleCheck } from "react-icons/fa6";

function Invitation() {
  const { eventId } = useParams();

  const [invitationImage, setInvitationImage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Pending");
  const [statusColor, setStatusColor] = useState("var(--color-dark-brown)");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    async function getInvitation() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/invitations/${eventId}`,
        );

        setInvitationImage(response.data.invitation.imageUrl);
      } catch (error) {
        console.log(error.response?.data);
      }
    }

    getInvitation();
  }, [eventId]);

  async function handleClick(e) {
    const selectedStatus = e.target.name;

    try {
      await axios.patch(
        `http://localhost:3000/api/events/${eventId}/guests/status`,
        {
          phone,
          status: selectedStatus,
        },
      );

      setStatusColor(e.target.style.backgroundColor);
      setStatus(selectedStatus);
      setShowMessage(true);
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  return (
    <>
      {showMessage && (
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
      )}

      <div className="content m-5 p-2 p-sm-5 d-flex flex-column justify-content-center align-items-center">
        {invitationImage && (
          <img
            src={invitationImage}
            alt="invitation"
            className="invitation-img"
          />
        )}

        <div className="d-flex flex-column justify-content-center align-items-center p-3 gap-3">
          <label htmlFor="phone">Please, Enter your phone number:</label>

          <input
            type="text"
            id="phone"
            value={phone}
            maxLength={11}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d*$/.test(value)) {
                setPhone(value);

                if (
                  value.length === 11 &&
                  !/^(010|011|012|015)\d{8}$/.test(value)
                ) {
                  setPhoneError("Please enter a valid Egyptian phone number.");
                } else {
                  setPhoneError("");
                }
              }
            }}
          />

          {phoneError && (
            <p style={{ color: "var(--color-red)" }}>{phoneError}</p>
          )}
        </div>

        <div className="d-flex flex-column flex-sm-row mt-4 gap-3 justify-content-center align-items-center">
          <button
            name="Confirmed"
            style={{
              backgroundColor: "var(--color-green)",
              border: "1px solid var(--color-green)",
            }}
            disabled={!/^(010|011|012|015)\d{8}$/.test(phone)}
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
            disabled={!/^(010|011|012|015)\d{8}$/.test(phone)}
            onClick={handleClick}
          >
            Maybe
          </button>

          <button
            name="Not Coming"
            style={{
              backgroundColor: "var(--color-red)",
              border: "1px solid var(--color-red)",
            }}
            disabled={!/^(010|011|012|015)\d{8}$/.test(phone)}
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
