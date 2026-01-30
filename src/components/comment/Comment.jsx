import { useState } from "react";
import replyIcon from "/icon-reply.svg";

function Comment({ score, avatar, username, date, content }) {
  const [userVote, setUserVote] = useState(0);
  const [currentScore, setCurrentScore] = useState(score);

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
    <div className="w-250 text-[#65696c] p-10 rounded-xl flex gap-10 bg-white">
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
          <p>{date}</p>
          <button type="button" className="reply-button">
            <img src={replyIcon} alt="reply icon" />
            <p className="font-bold">Reply</p>
          </button>
        </div>
        <p className="text-left">{content}</p>
      </div>
    </div>
  );
}

export default Comment;
