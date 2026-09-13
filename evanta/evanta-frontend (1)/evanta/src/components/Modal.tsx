import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export default function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="evanta-overlay" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="evanta-modal" onMouseDown={(e) => e.stopPropagation()}>
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
