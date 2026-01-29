import { useState } from "react";
import "./App.css";
import Comment from "./components/comment/Comment";
import DATA from "./data.json";

function App() {
  const [comments, setComments] = useState(DATA.comments);

  return (
    <div className="flex flex-col gap-10">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          score={comment.score}
          username={comment.user.username}
          avatar={comment.user.image.png}
          date={comment.createdAt}
          content={comment.content}
        />
      ))}
    </div>
  );
}

export default App;
