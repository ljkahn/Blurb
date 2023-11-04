import React from "react";
import BlurbStream from "../components/Blurbs/BlurbCard";
import BlurbCom from "../components/Blurbs/BlurbComCard";

function CommentPage() {
  return (
    <>
      <div>
        <BlurbStream />
      </div>
      <div>
        <BlurbCom />
      </div>
    </>
  );
}

export default CommentPage;
