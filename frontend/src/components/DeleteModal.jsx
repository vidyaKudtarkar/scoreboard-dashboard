import { useTheme } from "../context/ThemeContext";

export default function DeleteModal({ isOpen, onClose, onConfirm}) 
{

  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className={`p-6 rounded-2xl w-96 border ${
          isDark
            ? "bg-slate-900 border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">
          Confirm Delete
        </h2>

        <p className="mb-6 text-slate-500">
          Are you sure you want to delete this player?
        </p>

        <div className="flex justify-end gap-3">

          <button onClick={onClose} className={`px-4 py-2 rounded-xl ${
              isDark
                ? "bg-slate-700 text-white"
                : "bg-slate-200 text-slate-900"
            }`}>
            Cancel
          </button>

          <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-600 text-white">
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}