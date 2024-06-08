import { useFormStatus } from "react-dom";

function CancelButton({ text, onCancel }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn-white w-full h-9 font-bold"
      disabled={pending}
      onClick={onCancel}>
      {text ?? "Cancel"}
    </button>
  );
}

export default CancelButton;
