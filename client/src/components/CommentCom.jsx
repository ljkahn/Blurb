import React from "react";
import BlurbStream from "./Blurbs/BlurbCard";
import Comment from "./Blurbs/BlurbComCard";

function CommentCom() {
  return (
    <div>
      <div>
        <BlurbStream />
      </div>
      <div>
        <Comment />
      </div>
    </div>
  );
}

export default CommentCom;
