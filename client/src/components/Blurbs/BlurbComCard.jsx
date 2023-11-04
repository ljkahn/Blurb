import React from "react";
import "../../style/Blurbs.css";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function BlurbCom() {
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
