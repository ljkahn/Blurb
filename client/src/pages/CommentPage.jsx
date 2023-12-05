import Blurb from "../components/Blurbs/BlurbCard";
import React from "react";
import { useQuery } from "@apollo/client";
import { FIND_BLURB_BY_ID } from "../utils/mutations/Blurb/BlurbMutations";
import BlurbCom from "../components/Blurbs/BlurbComCard";
function CommentPage() {
  const { loading, data } = useQuery(FIND_BLURB_BY_ID, {
    variables: { blurbId: "6542aa306a9a59a5a9f640d1" },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  const blurb = data.blurbs._id;
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
