import { useRef, useState } from "react";
import "./App.css";
import Comment from "./components/comment/Comment";
import DATA from "./data.json";
import { CommentsContext } from "./components/comment/Comments-Context";
import Modal from "./components/Modal";
import InputBox from "./components/inputBox/InputBox";

function App() {
  const dialog = useRef();
  const [comments, setComments] = useState(DATA.comments);

  const commentsCtx = {
    handleCommentDelete: handleCommentDelete,
    handleConfirmDelete: handleConfirmDelete,
  };

  let commentID;
  function handleCommentDelete(id) {
    commentID = id;
    dialog.current.open();
  }

  function handleConfirmDelete(selected_id) {
    setComments((prevComments) => {
      const updatedComments = prevComments.filter(
        (comment) => comment.id !== selected_id,
      );

      return updatedComments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== selected_id),
        };
      });
    });
  }

  return (
    <>
      <CommentsContext.Provider value={commentsCtx}>
        <Modal ref={dialog}>
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
        </Modal>
        <div className="flex flex-col gap-5 w-250">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              score={comment.score}
              username={comment.user.username}
              avatar={comment.user.image.png}
              date={comment.createdAt}
              content={comment.content}
              replies={comment.replies || []}
            />
          ))}
        </div>
      </CommentsContext.Provider>
      <InputBox />
    </>
  );
}

export default App;
