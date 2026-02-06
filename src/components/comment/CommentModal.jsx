export default function CommentModal({
  title,
  description,
  type,
  onConfirm,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-1002">
      <div className="flex flex-col gap-5 bg-white rounded-xl p-7">
        <div>
          <p className="font-bold text-[#353d4c] text-xl text-left mt-5">
            {title}
          </p>
          <p className="text-[#878b8e] text-left text-sm mt-3">{description}</p>
        </div>
        <form
          method="dialog"
          className="flex gap-5 w-fit ml-auto mt-4 text-right"
        >
          {type === "Delete" ? (
            <>
              <button
                className="cursor-pointer bg-[#68727e] px-3 py-2 rounded-sm font-bold mt-auto"
                onClick={onClose}
              >
                <p className="text-bold text-sm">No, Cancel</p>
              </button>
              <button
                className="cursor-pointer bg-[#ed6663] px-3 py-2 rounded-sm font-bold mt-auto"
                onClick={onConfirm}
              >
                <p className="text-bold text-sm">Yes, Delete</p>
              </button>
            </>
          ) : (
            <button
              className="cursor-pointer bg-[#68727e] px-3 py-2 rounded-sm font-bold mt-auto"
              onClick={onClose}
            >
              <p className="text-bold text-sm">Okay.</p>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
