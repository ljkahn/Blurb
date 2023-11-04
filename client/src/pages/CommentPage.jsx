import Blurbstream from "../components/Blurbs/BlurbCard";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BLURB_BY_ID } from "../utils/mutations/Blurb/BlurbMutations";
import BlurbCom from "../components/Blurbs/BlurbComCard";

function CommentPage() {
  const { loading, data } = useQuery(GET_BLURB_BY_ID, {
    variables: { blurbId: "654676b83ac2a6d51c0ae1e9" }, // Replace with the actual blurb ID
  });

  console.log.apply(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  const blurb = data.blurbs._id; // Assuming that the query returns a single blurb

  return (
    <div>
      <Blurbstream
        key={blurb._id}
        blurbId={blurb._id}
        username={blurb.blurbAuthor.username}
      >
        {blurb.blurbText}
      </Blurbstream>
    </div>
  );
}

export default CommentPage;
