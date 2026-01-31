import { useContext, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { CommentsContext } from "/src/components/comment/Comments-Context";

function Modal({ ref }) {
  const dialog = useRef();
  const { handleConfirmDelete } = useContext(CommentsContext);
  let commentID;
  useImperativeHandle(ref, () => {
    return {
      open(id) {
        commentID = id;
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <div className="w-full h-full">
      <dialog
        ref={dialog}
        className="bg-white backdrop:bg-stone-900/90 w-80 p-4 rounded-md shadow-md m-auto"
      >
        <p className="font-bold text-[#353d4c] text-xl text-left mt-5">
          Delete Comment
        </p>
        <p className="text-[#878b8e] text-left text-sm mt-3">
          Are you sure you want to delete this comment? This will remove the
          comment and it can't be undone.
        </p>
        <form
          method="dialog"
          className="flex gap-5 w-fit ml-auto mt-4 text-right"
        >
          <button className="cursor-pointer bg-[#68727e] px-3 py-2 rounded-sm font-bold mt-auto">
            <p className="text-bold text-sm">No, Cancel</p>
          </button>
          <button
            className="cursor-pointer bg-[#ed6663] px-3 py-2 rounded-sm font-bold mt-auto"
            onClick={() => handleConfirmDelete(commentID)}
          >
            <p className="text-bold text-sm">Yes, Delete</p>
          </button>
        </form>
      </dialog>
      ,
    </div>,
    document.getElementById("root"),
  );
}

export default Modal;
