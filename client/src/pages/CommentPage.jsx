import Blurbstream from "../components/Blurbs/BlurbCard";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BLURB_BY_ID } from "../utils/Queries/queries";

function CommentPage() {
  const { loading, data } = useQuery(GET_BLURB_BY_ID, {
    variables: { blurbId: "6545e091ea310c49c0c35992" }, // Replace with the actual blurb ID
  });

  console.log(data, "-----comment-----");

  if (loading) {
    return <p>Loading...</p>;
  }

  const blurb = data.blurb; // Access the blurb object

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
