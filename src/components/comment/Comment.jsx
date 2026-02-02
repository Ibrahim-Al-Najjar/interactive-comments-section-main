import { useContext, useRef, useState } from "react";
import { CommentsContext } from "./Comments-Context";
import replyIcon from "/icon-reply.svg";
import editIcon from "/icon-edit.svg";
import deleteIcon from "/icon-delete.svg";
import DATA from "/src/data.json";
import Modal from "../Modal";

function Comment({ id, score, avatar, username, date, content, replies = [] }) {
  const [userVote, setUserVote] = useState(0);
  const [currentScore, setCurrentScore] = useState(score);
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(content);

  const commentRef = useRef();
  const dialog = useRef();

  const { handleCommentDelete } = useContext(CommentsContext);

  const isCurrentUser = username === DATA.currentUser.username;

  function handleUpVote() {
    let delta = 0;
    if (userVote === 1) {
      delta = -1;
      setUserVote(0);
    } else if (userVote === -1) {
      delta = 2;
      setUserVote(1);
    } else {
      delta = 1;
      setUserVote(1);
    }
    setCurrentScore((s) => s + delta);
  }

  function handleDownVote() {
    let delta = 0;
    if (userVote === -1) {
      delta = 1;
      setUserVote(0);
    } else if (userVote === 1) {
      delta = -2;
      setUserVote(-1);
    } else {
      delta = -1;
      setUserVote(-1);
    }
    setCurrentScore((s) => s + delta);
  }

  function handleCommentEdit() {
    setIsEditing((prevState) => !prevState);
  }

  function handleConfirmEdit() {
    if (commentRef.current.value === "") {
      dialog.current.open();
      return;
    }
    setCommentContent(commentRef.current.value);
    handleCommentEdit();
  }

  return (
    <>
      <Modal ref={dialog}>
        <p className="font-bold text-[#353d4c] text-xl text-left mt-5">
          Invalid Input
        </p>
        <p className="text-[#878b8e] text-left text-sm mt-3">
          Empty comment doesn't allowed.
        </p>
        <form
          method="dialog"
          className="flex gap-5 w-fit ml-auto mt-4 text-right"
        >
          <button className="cursor-pointer bg-[#68727e] px-3 py-2 rounded-sm font-bold mt-auto">
            <p className="text-bold text-sm">Okay</p>
          </button>
        </form>
      </Modal>
      <div
        className={`text-[#65696c] p-10 rounded-xl flex gap-10 bg-white mb-5`}
      >
        <div className=" font-bold text-[#5152a6] bg-[#f5f6f8] h-fit w-12 p-2 rounded-xl">
          <button
            type="button"
            className={`score-button ${userVote === 1 ? "selected-score-button" : "unselected-score-button"}`}
            onClick={handleUpVote}
          >
            +
          </button>
          <p>{currentScore}</p>
          <button
            type="button"
            className={`score-button ${userVote === -1 ? "selected-score-button" : "unselected-score-button"}`}
            onClick={handleDownVote}
          >
            -
          </button>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex gap-5 items-center w-full">
            <img src={avatar} alt={`${username} avatar`} className="w-10" />
            <p className="text-[#4a5258] font-bold">{username}</p>
            {isCurrentUser && (
              <p className="text-white px-2 py-1 rounded-sm bg-[#5152a6] font-bold text-xs">
                you
              </p>
            )}
            <p>{date}</p>
            <div className="ml-auto flex gap-8">
              {isCurrentUser && (
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleCommentDelete(id)}
                >
                  <img src={deleteIcon} alt="delete icon" />
                  <p className="font-bold">Delete</p>
                </button>
              )}
              {isCurrentUser ? (
                <button
                  type="button"
                  className="action-button"
                  onClick={handleCommentEdit}
                >
                  <img src={editIcon} alt="edit icon" />
                  <p className="font-bold">Edit</p>
                </button>
              ) : (
                <button type="button" className="action-button">
                  <img src={replyIcon} alt="reply icon" />
                  <p className="font-bold">Reply</p>
                </button>
              )}
            </div>
          </div>
          {isEditing ? (
            <div className="flex justify-between">
              <textarea ref={commentRef} className="text-box">
                {commentContent}
              </textarea>
              <button className="confirm-button" onClick={handleConfirmEdit}>
                Edit
              </button>
            </div>
          ) : (
            <span className="text-left">
              {commentContent.startsWith("@") ? (
                <>
                  <span className="text-[#5152a6] font-bold">
                    {commentContent.split(" ")[0]}
                  </span>
                  {" " + commentContent.split(" ").slice(1).join(" ")}
                </>
              ) : (
                commentContent
              )}
            </span>
          )}
        </div>
      </div>
      {replies.length > 0 && (
        <div className="flex gap-10">
          <div className="bg-[#7c85805e] rounded-xl w-0.5 ml-auto"></div>
          <div className="w-[80%]">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                id={reply.id}
                score={reply.score}
                username={reply.user.username}
                avatar={reply.user.image.png}
                date={reply.createdAt}
                content={`@${reply.replyingTo} ${reply.content}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
