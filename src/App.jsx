import { useRef, useState } from "react";
import "./App.css";
import Comment from "./components/comment/Comment";
import DATA from "./data.json";
import { CommentsContext } from "./components/comment/Comments-Context";
import Modal from "./components/Modal";

function App() {
  const dialog = useRef();
  const [comments, setComments] = useState(DATA.comments);

  const commentsCtx = {
    handleCommentDelete: handleCommentDelete,
    handleConfirmDelete: handleConfirmDelete,
  };

  function handleCommentDelete(id) {
    dialog.current.open(id);
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
        <Modal ref={dialog} />
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
    </>
  );
}

export default App;
