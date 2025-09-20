export default function ConfirmDelete({onConfirm}) {
  return (
    <form
    className="popup__form"
    name="delete-card-form"
    id="delete-card-form"
    noValidate
    >
      <button
      className="popup__confirm-btn"
      type="button"
      onClick={onConfirm}
      >
        Sí, eliminar.
      </button>
    </form>
  );
}

