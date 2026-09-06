import { useState } from "react";
function InvitationLink({ imgFile }) {
  let link = `https://google.com`;

  let [labelContent, setLabelContent] = useState("Copy Link");
  // بظبط ال label اللي على البوتون
  function handleLableContent() {
    if (labelContent === "Copy Link") {
      setLabelContent("Copied!");
      setTimeout(() => {
        setLabelContent("Copy Link");
      }, 1500);
    }
  }
  // ياخد اللينك كوبي
  function handleCopy() {
    navigator.clipboard.writeText(link);
    handleLableContent();
  }
  return (
    <>
      <div className="content p-4">
        <h3>Invitation Link</h3>
        {imgFile ? (
          <p>Share this link with your guests</p>
        ) : (
          <p>Please Upload your invitation to create your invitation link.</p>
        )}
        <span
          className="p-2 w-100"
          style={{
            border: "1px solid var(--color-brown)",
            borderRadius: "8px",
            visibility: imgFile ? "visible" : "hidden",
          }}
        >
          {link}
        </span>
        <button
          onClick={handleCopy}
          disabled={!imgFile}
          className={`mt-4 ${labelContent === "Copied!" ? "copied" : ""}`}
        >
          {labelContent}
        </button>
      </div>
    </>
  );
}
export default InvitationLink;
