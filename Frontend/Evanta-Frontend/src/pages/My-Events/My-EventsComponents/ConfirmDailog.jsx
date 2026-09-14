import Modal from "./Modal";

export default function ConfirmDialog({ message, onCancel, onConfirm }) {
  return (
    <Modal title="Delete Event" onClose={onCancel}>
      <p className="evanta-muted mb-4">{message}</p>
      <div className="d-flex gap-2 justify-content-end">
        <button className="btn-evanta btn-evanta-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-evanta btn-evanta-danger" onClick={onConfirm}>
          Yes, Delete
        </button>
      </div>
    </Modal>
  );
}
