import React from "react";
import "../../style/Blurbs.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Avatar from "@mui/material/Avatar";
import { Link } from "@mui/material";

function BlurbStream() {
  //functuion to append list of blurbs

  return (
    <div id="bluMain">
      <div className="blurbContainer">
        <div id="blurbColOne">
          <Avatar
            id="notifyPP"
            className="Blfriend"
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
          {/* <div className="Blfriend" /> */}
          <div className="blInfo">
            <div>
              <div className="userName">Jenny</div>
            </div>
            <div>once i was a frog that got eaten by a dog</div>
          </div>
        </div>
        <div id="notifyIcons">
          <div className="likeComment">
            <FavoriteBorderIcon />
          </div>
          <Link className="likeComment">
            <ChatBubbleOutlineIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlurbStream;
