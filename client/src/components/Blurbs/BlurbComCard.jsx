import React from "react";
import "../../style/Blurbs.css";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { GET_BLURB_BY_ID } from "../../utils/Queries/queries";
import { useQuery } from "@apollo/client";

function BlurbCom({ blurbId }) {
  const { loading, data } = useQuery(GET_BLURB_BY_ID, {
    variables: { blurbId },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.findBlurbById) {
    console.log("Data is missing expected properties:", data); // Add this line for debugging
    return <p>Data is missing expected properties.</p>;
  }

  console.log("Data:", data); // Add this line for debugging

  const blurb = data.findBlurbById;

  return (
    <div id="bluMain">
      <div className="blurbContainer comContainer">
        <div id="blurbColOne">
          <div className="blInfo">
            <div>
              <div className="userName">{blurb.blurbAuthor.username}</div>
            </div>
            {blurb.comments.map((comment) => (
              <div key={comment._id} className="comment">
                {comment.commentText}
              </div>
            ))}
          </div>
        </div>
        <div className="likeComment">
          <FavoriteBorderIcon />
        </div>
      </div>
    </div>
  );
}

export default BlurbCom;
