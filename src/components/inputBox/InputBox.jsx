import { currentUser } from "/src/data.json";

function InputBox() {
  const userImgPath = currentUser.image.png;
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
        ></textarea>

        <button className="confirm-button">SEND</button>
      </div>
    </div>
  );
}

export default InputBox;
