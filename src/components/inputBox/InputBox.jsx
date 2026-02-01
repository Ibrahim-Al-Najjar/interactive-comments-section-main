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
          className="border border-[#eaecf1] px-4 py-2 w-full h-24 rounded-lg focus:outline-none focus:border-[#5152a6] resize-none"
          placeholder="Add a comment..."
        ></textarea>

        <button className="bg-[#5152a6] hover:opacity-70 transition-opacity font-bold text-white px-8 py-3 rounded-xl self-start">
          SEND
        </button>
      </div>
    </div>
  );
}

export default InputBox;
