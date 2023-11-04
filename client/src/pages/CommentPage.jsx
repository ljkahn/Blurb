import React from "react";
import Blurb from "../components/Blurbs/BlurbCard";
import BlurbCom from "../components/Blurbs/BlurbComCard";

function CommentPage() {
  return (
    <>
      <div>
        <Blurb />
      </div>
      <div>
        <BlurbCom />
      </div>
    </>
  );
}

export default CommentPage;
