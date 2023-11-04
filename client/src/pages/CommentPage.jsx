import Blurb from "../components/Blurbs/BlurbCard";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BLURB_BY_ID } from "../utils/mutations/Blurb/BlurbMutations";

function CommentPage() {
  const { loading, data } = useQuery(GET_BLURB_BY_ID, {
    variables: { blurbId: "6542aa306a9a59a5a9f640d1" }, // Replace with the actual blurb ID
  });

  console.log.apply(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  const blurb = data.blurbs._id; // Assuming that the query returns a single blurb

  return (
    <div>
      <Blurb
        key={blurb._id}
        blurbId={blurb._id}
        username={blurb.blurbAuthor.username}
      >
        {blurb.blurbText}
      </Blurb>
    </div>
  );
}

export default CommentPage;
