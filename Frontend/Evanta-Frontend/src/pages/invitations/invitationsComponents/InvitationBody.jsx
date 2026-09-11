import { useState, useEffect } from "react";
import InvitationImg from "./InvitationImg";
import InvitationLink from "./InvitationLink";
import InvitationQR from "./InvitationQR";
import axios from "axios";
function InvitationBody() {
  // فايل الصورة علشان احطه في ال event invitation
  let [imgFile, setImgFile] = useState(null);
  let [imageUrl, setImageUrl] = useState(null);
  let [invitationUrl, setInvitationUrl] = useState(null);
  const eventId = "EVENT_ID_HERE";
  async function handleUpload(file) {
    const formData = new FormData();
    formData.append("invitationImage", file);
    formData.append(
      "invitationUrl",
      `http://localhost:5173/public-invitation/${eventId}`,
    );
    try {
      const response = await axios.post(
        `http://localhost:3000/api/invitations/${eventId}`,
        formData,
      );
      setImageUrl(response.data.invitation.imageUrl);
      setInvitationUrl(response.data.invitation.invitationUrl);
    } catch (err) {
      console.log(err.response?.data);
    }
  }
  async function handleDelete() {
    try {
      await axios.delete(`http://localhost:3000/api/invitations/${eventId}`);

      setImgFile(null);
      setImageUrl(null);
      setInvitationUrl(null);
    } catch (err) {
      console.log(err.response?.data);
    }
  }
  useEffect(() => {
    async function getInvitation() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/invitations/${eventId}`,
        );
        setImageUrl(response.data.invitation.imageUrl);
        setInvitationUrl(response.data.invitation.invitationUrl);
      } catch (err) {
        console.log(err.response?.data);
      }
    }

    getInvitation();
  }, [eventId]);
  return (
    <>
      <div className="container p-5">
        <h1 className="py-3">Invitations</h1>
        <div className="row g-3">
          <div className="col-lg-4 col-12">
            <InvitationImg
              imgFile={imgFile}
              setImgFile={setImgFile}
              handleUpload={handleUpload}
              handleDelete={handleDelete}
              imageUrl={imageUrl}
            />
          </div>
          <div className="col-lg-8 col-12 d-flex flex-column gap-3">
            <InvitationLink
              imgFile={imgFile}
              imageUrl={imageUrl}
              invitationUrl={invitationUrl}
            />
            <InvitationQR
              imgFile={imgFile}
              imageUrl={imageUrl}
              invitationUrl={invitationUrl}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default InvitationBody;
