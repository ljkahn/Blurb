import React from "react";
import BlurbStream from "./Blurbs/BlurbCard";
import { GET_BLURB_BY_ID } from "../utils/mutations/Blurb/BlurbMutations";
import { useQuery } from "@apollo/client";

function CommentCom() {
  const { loading, data } = useQuery(GET_BLURB_BY_ID, {
    variables: { blurbId: "65466205435d538f2c311bc8" }, // Replace with the actual blurb ID
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if data contains the expected structure
  if (!data || !data.getBlurbById) {
    return <p>Data is missing expected properties.</p>;
  }

  const blurb = data.getBlurbById;

  return (
    <div>
      <BlurbStream
        blurbId={blurb._id}
        username={blurb.blurbAuthor.username}
        comments={blurb.comments}
        isLiked={blurb.isLiked} // Pass isLiked if you have this information
      />
    </div>
  );
}

export default CommentCom;
