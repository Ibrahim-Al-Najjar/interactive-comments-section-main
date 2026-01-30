import { useState } from "react";
import "./App.css";
import Comment from "./components/comment/Comment";
import DATA from "./data.json";

function App() {
  const [comments, setComments] = useState(DATA.comments);

  return (
    <div className="flex flex-col gap-5 w-250">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          score={comment.score}
          username={comment.user.username}
          avatar={comment.user.image.png}
          date={comment.createdAt}
          content={comment.content}
          replies={comment.replies || []}
        />
      ))}
    </div>
  );
}

export default App;
