import React from "react";
import "../../style/Blurbs.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Avatar from "@mui/material/Avatar";

function FireCard() {
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
            <WhatshotIcon />
          </div>
          <div className="likeComment">
            <ChatBubbleOutlineIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FireCard;
