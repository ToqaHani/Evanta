import { useState } from "react";
import InvitationImg from "./InvitationImg";
import InvitationLink from "./InvitationLink";
import InvitationQR from "./InvitationQR";

function InvitationBody() {
  // فايل الصورة علشان احطه في ال event invitation
  let [imgFile, setImgFile] = useState(null);
  return (
    <>
      <div className="container p-5">
        <h1 className="py-3">Invitations</h1>
        <div className="row g-3">
          <div className="col-lg-4 col-12">
            <InvitationImg imgFile={imgFile} setImgFile={setImgFile} />
          </div>
          <div className="col-lg-8 col-12 d-flex flex-column gap-3">
            <InvitationLink imgFile={imgFile} />
            <InvitationQR imgFile={imgFile} />
          </div>
        </div>
      </div>
    </>
  );
}
export default InvitationBody;
