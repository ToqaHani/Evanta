import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="evanta-overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
    >
      <div
        className="evanta-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="evanta-modal-title">{title}</h2>
          <button className="evanta-close" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
