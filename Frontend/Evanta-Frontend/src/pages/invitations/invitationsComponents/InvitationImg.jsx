import { useRef } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";
function InvitationImg({ imgFile, setImgFile }) {
  // علشان اتحكم في القيمة اللي في الانبوت ساعة المسح
  let inputRef = useRef(null);

  // بستلم الصورة من اليوزر و بغير ال label
  function handleInput(e) {
    let file = e.target.files[0];
    if (!file) {
      setImgFile(null);
    } else {
      setImgFile(file);
    }
  }

  // بتحكم في مسح الصورة و ال label
  function handleRemove() {
    inputRef.current.value = null;
    setImgFile(null);
  }

  return (
    <>
      <div className="content p-4">
        <h3>Invitation Image</h3>
        <p>Upload your invitation design</p>
        <div className="upload mt-4">
          <input
            type="file"
            name=""
            id="file"
            hidden
            onChange={handleInput}
            ref={inputRef}
          />
          {imgFile ? (
            <>
              <img
                src={URL.createObjectURL(imgFile)}
                alt={imgFile.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
            </>
          ) : (
            <>
              <label
                htmlFor="file"
                className="d-flex flex-column align-items-center text-center"
              >
                <>
                  <FaArrowUpFromBracket size={"30px"} />
                  <p>Click to Upload</p>
                </>
              </label>
            </>
          )}
        </div>
        <button
          className="mt-4 mx-auto d-flex align-items-center justify-content-center"
          onClick={handleRemove}
          disabled={!imgFile}
        >
          Remove Image
        </button>
      </div>
    </>
  );
}
export default InvitationImg;
