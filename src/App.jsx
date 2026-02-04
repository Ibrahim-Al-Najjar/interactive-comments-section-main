import { useState } from "react";
import "./App.css";
import Comment from "./components/comment/Comment";
import DATA from "./data.json";
import InputBox from "./components/inputBox/InputBox";
import CommentModal from "./components/comment/DeleteConfirmModal";

function App() {
  const [comments, setComments] = useState(DATA.comments);
  const [commentID, setCommentID] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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

    setIsOpen(false);
  }

  return (
    <>
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
            onCommentDelete={() => {
              setCommentID(comment.id);
              setIsOpen(true);
            }}
          />
        ))}
      </div>

      <InputBox />
      {isOpen && commentID !== 0 && (
        <CommentModal
          title="Delete Comment"
          description="Are you sure you want to delete this comment? This will remove the
            comment and it can't be undone."
          type="Delete"
          onConfirm={() => {
            handleConfirmDelete(commentID);
          }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default App;
