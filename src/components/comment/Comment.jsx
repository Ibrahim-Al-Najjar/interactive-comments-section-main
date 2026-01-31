import { useContext, useState } from "react";
import replyIcon from "/icon-reply.svg";
import deleteIcon from "/icon-delete.svg";
import DATA from "/src/data.json";
import { CommentsContext } from "./Comments-Context";

function Comment({
  id,
  score,
  avatar,
  username,
  date,
  content,
  replies = [],
  classes,
}) {
  const [userVote, setUserVote] = useState(0);
  const [currentScore, setCurrentScore] = useState(score);

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

  return (
    <>
      <div
        className={` text-[#65696c] p-10 rounded-xl flex gap-10 bg-white ${classes}`}
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
        <div className="flex flex-col gap-5">
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
              <button type="button" className="reply-button">
                <img src={replyIcon} alt="reply icon" />
                <p className="font-bold">Reply</p>
              </button>
            </div>
          </div>
          <p className="text-left">{content}</p>
        </div>
      </div>
      <div>
        {replies.map((reply) => (
          <Comment
            classes="w-[80%] ml-auto mb-5"
            key={reply.id}
            id={reply.id}
            score={reply.score}
            username={reply.user.username}
            avatar={reply.user.image.png}
            date={reply.createdAt}
            content={reply.content}
          />
        ))}
      </div>
    </>
  );
}

export default Comment;
