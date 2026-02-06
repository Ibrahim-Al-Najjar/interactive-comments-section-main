import { useState } from "react";
import DATA from "/src/data.json";

function InputBox({ setComments, idCount }) {
  const { currentUser } = DATA;
  const userImgPath = currentUser.image.png;

  let [content, setContent] = useState("");

  let canSend = content !== "";

  function getCommentInfo() {
    return {
      id: idCount + 1,
      content: content,
      createdAt: "Just now",
      score: 0,
      user: currentUser,
    };
  }

  function handleCommentSend(comment) {
    setComments((prevComments) => {
      return Array.isArray(prevComments)
        ? [...prevComments, comment]
        : [comment];
    });
    setContent("");
  }

  return (
    <div className="sticky bottom-0 w-full py-4 z-10">
      <div className="flex items-center justify-center bg-white text-[#65696c] p-6 rounded-xl gap-5 w-full shadow-sm">
        <img
          className="w-12 h-12 rounded-full self-start"
          src={userImgPath}
          alt="userImg"
        />
        <textarea
          className="text-box"
          placeholder="Add a comment..."
          onChange={(event) => {
            setContent(event.target.value);
          }}
          value={content}
        ></textarea>

        <button
          className={`confirm-button ${!canSend ? "disabled-button" : undefined}`}
          onClick={() => {
            if (canSend) {
              const commentInfo = getCommentInfo();
              handleCommentSend(commentInfo);
            }
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default InputBox;
