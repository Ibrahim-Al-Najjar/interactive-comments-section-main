import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ ref, children }) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
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
        {children}
      </dialog>
    </div>,
    document.getElementById("root"),
  );
}

export default Modal;
