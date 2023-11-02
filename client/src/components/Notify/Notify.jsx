import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Avatar from "@mui/material/Avatar";
import "../../style/Blurbs.css";

function Notify() {
  return (
    <div id="bluMain">
      <div>
      </div>
      <div className="blurbContainer">
        <div id="blurbColOne">
          <Avatar
            id="notifyPP"
            className="Blfriend"
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
          <div>
            <div className="blInfo">
              <div>
                <div className="userName">Jenny</div>
              </div>
              <div>Notification</div>
            </div>
          </div>
        </div>
        <div id="notifyIcons">
          <div className="likeComment">
            <RemoveRedEyeOutlinedIcon />
          </div>
          <div className="likeComment">
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notify;
