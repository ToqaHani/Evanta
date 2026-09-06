import { QRCodeCanvas } from "qrcode.react";
function InvitationQR({ imgFile }) {
  let link = "https://google.com";

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "invitation-qr.png";
    downloadLink.click();
  };
  return (
    <>
      <div className="content p-4">
        <h3>Invitation QR</h3>
        {imgFile ? (
          <p>Scan to open invitation</p>
        ) : (
          <p>Please Upload your invitation to create your invitation QR Code</p>
        )}
        <QRCodeCanvas
          id="qr-code"
          value={link}
          size={200}
          style={{ visibility: imgFile ? "visible" : "hidden" }}
        />
        <button className="mt-4" disabled={!imgFile} onClick={downloadQR}>
          Download QR Code
        </button>
      </div>
    </>
  );
}
export default InvitationQR;
