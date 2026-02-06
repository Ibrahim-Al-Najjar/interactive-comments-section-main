import { Fragment, useRef, useState } from "react";
import replyIcon from "/icon-reply.svg";
import editIcon from "/icon-edit.svg";
import deleteIcon from "/icon-delete.svg";
import DATA from "/src/data.json";
import CommentModal from "./CommentModal";

function Comment({
  id,
  score,
  avatar,
  username,
  date,
  content,
  replies = [],
  onCommentDelete,
  handleCommentDelete,
  handleConfirmDelete,
}) {
  const [userVote, setUserVote] = useState(0);
  const [currentScore, setCurrentScore] = useState(score);
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(content);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

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

  function switchEditMode() {
    setIsEditing((prevState) => !prevState);
  }

  function handleConfirmEdit() {
    if (commentContent === "") {
      setIsOpen(true);
      return;
    }
    setIsEdited(true);
    switchEditMode();
  }

  function renderTextWithMentions(text) {
    const mentionRegex = /@[a-zA-Z0-9_.]+\b/g;

    const parts = text.split(mentionRegex);
    const mentions = text.match(mentionRegex);

    return (
      <span>
        {parts.map((part, index) => (
          <Fragment key={index}>
            {part}
            {mentions && mentions[index] && (
              <span className="font-bold text-[#5152a6]">
                {mentions[index]}
              </span>
            )}
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <>
      {isOpen && (
        <CommentModal
          title="Delete Comment"
          description="Are you sure you want to delete this comment? This will remove the comment and it can't be undone."
          type="Delete"
          onConfirm={() => handleConfirmDelete(id)}
          onClose={() => setIsOpen(false)}
        />
      )}
      <div
        className={`text-[#65696c] p-5 rounded-xl text-sm flex gap-10 bg-white mb-5`}
      >
        <div className=" font-bold text-[#5152a6] bg-[#f5f6f8] h-fit w-10 p-2 rounded-xl">
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
            <p className="text-[#4a5258] font-extrabold">{username}</p>
            {isCurrentUser && (
              <p className="text-white px-2 py-1 rounded-sm bg-[#5152a6] font-bold text-xs">
                you
              </p>
            )}

            {isEdited && <p className="text-nowrap">(edited)</p>}
            <div className="ml-auto flex gap-8">
              {isCurrentUser && (
                <button
                  type="button"
                  className="delete-button"
                  onClick={onCommentDelete}
                >
                  <img src={deleteIcon} alt="delete icon" />
                  <p className="font-bold">Delete</p>
                </button>
              )}
              {isCurrentUser ? (
                <button
                  type="button"
                  className="action-button"
                  onClick={switchEditMode}
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
              <textarea
                className="text-box font-bold"
                onChange={(event) => setCommentContent(event.target.value)}
              >
                {commentContent}
              </textarea>
              <button
                className={
                  commentContent === ""
                    ? "delete-confirm-button"
                    : "confirm-button"
                }
                onClick={handleConfirmEdit}
              >
                {commentContent === "" ? "DELETE" : "UPDATE"}
              </button>
            </div>
          ) : (
            <>
              <span className="text-left font-bold">
                {renderTextWithMentions(commentContent)}
              </span>
              <p className="text-nowrap text-gray-400 text-right text-xs">
                {date}
              </p>
            </>
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
                onCommentDelete={() => handleCommentDelete(reply.id)}
                handleCommentDelete={handleCommentDelete}
                handleConfirmDelete={handleConfirmDelete}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
