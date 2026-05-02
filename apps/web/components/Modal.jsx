export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      <div className="bg-slate-900 p-6 rounded-2xl w-[90%] max-w-md border border-white/10 shadow-xl">
        {children}

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400"
        >
          ✕
        </button>
      </div>
    </div>
  );
}