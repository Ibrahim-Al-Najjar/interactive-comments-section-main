import replyIcon from "/icon-reply.svg";
function Comment({ score, avatar, username, date, content }) {
  return (
    <div className="w-250 text-[#65696c] p-10 rounded-xl flex gap-10 bg-white">
      <div className=" font-bold text-[#5152a6] bg-[#f5f6f8] h-fit p-2 rounded-xl">
        <button className="score-button">+</button>
        <p>{score}</p>
        <button className="score-button">-</button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 items-center w-full">
          <img src={avatar} alt="avatar" className="w-10" />
          <p className="text-[#4a5258] font-bold">{username}</p>
          <p>{date}</p>
          <button className="reply-button">
            <img src={replyIcon} alt="reply" />
            <p className="font-bold">Reply</p>
          </button>
        </div>
        <p className="text-left">{content}</p>
      </div>
    </div>
  );
}

export default Comment;
