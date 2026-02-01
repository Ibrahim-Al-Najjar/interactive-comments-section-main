import { currentUser } from "/src/data.json";

function InputBox() {
  const userImgPath = currentUser.image.png;
  return (
    <div className="flex items-center justify-center bg-white text-[#65696c] p-10 rounded-xl gap-10 w-full ">
      <img className="w-13 self-start" src={userImgPath} alt="userImg" />
      <textarea
        className="border px-4 py-2 w-full h-25"
        placeholder="Add a comment..."
      ></textarea>
      <button className="bg-[#5152a6] font-bold text-white px-8 py-4 rounded-xl self-start">
        SEND
      </button>
    </div>
  );
}

export default InputBox;
