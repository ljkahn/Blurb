import React from "react";
import "../../style/Blurbs.css";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { GET_BLURB_BY_ID } from "../../utils/Queries/queries";
import { useQuery } from "@apollo/client";

function BlurbCom() {
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
      <div id="bluMain">
        <div className="blurbContainer comContainer">
          <div id="blurbColOne">
            {/* <Avatar
              id="notifyPP"
              className="Blfriend"
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 40, height: 40 }}
            /> */}
            {/* <div className="Blfriend" /> */}
            <div className="blInfo">
              <div>
                <div className="userName">Jenny</div>
              </div>
              <div>Girl this is so relatable!!</div>
            </div>
          </div>
          <div className="likeComment">
            <FavoriteBorderIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlurbCom;
