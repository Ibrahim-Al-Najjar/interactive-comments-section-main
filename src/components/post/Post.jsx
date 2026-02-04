import { useState } from "react";
import DATA from "/src/data.json";
import CommentsSection from "../comment/CommentsSection";
import InputBox from "../inputBox/InputBox";
import postImage from "/project.png";
export default function Post() {
  const [comments, setComments] = useState(DATA.comments);

  return (
    <div className="w-200 bg-gray-50 rounded-xl p-10">
      <div className="mb-5 flex gap-3">
        <img
          className="w-12"
          src={DATA.currentUser.image.png}
          alt="currentUser"
        />
        <div className="flex flex-col text-left">
          <p className="font-bold text-[#4a5258]">
            {DATA.currentUser.username}
          </p>
          <p className="text-[#65696C]">1 month ago</p>
        </div>
      </div>
      <p className="text-[#4a5258] text-left">
        Finally stepping out of my "work-in-progress" bubble. I’ve been
        heads-down on this for a while, and it feels so good to finally share it
        with you all!
      </p>
      <div className="my-5">
        <img src={postImage} alt="postImage" />
      </div>
      <CommentsSection comments={comments} setComments={setComments} />
      <InputBox />
    </div>
  );
}
