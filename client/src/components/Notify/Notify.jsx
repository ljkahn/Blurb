import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import "../../style/Blurbs.css";
import { REMOVE_Blurb } from "../../utils/mutations/Blurb/BlurbMutations";
import { useMutation } from "@apollo/client";

function Notify() {
  const blurbId = "";
  const [removeBlurb, { error }] = useMutation(REMOVE_Blurb);

  const handleRemove = async () => {
    try {
      const response = await removeBlurb({
        variables: { blurbId },
      });
    
    } catch (err) {
      console.error("Error removing blurb: ", err);
    }
    console.log(blurbId);
  };

  if (error) {
    return <p>An error occurred while trying to remove the blurb.</p>;
  }

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
          <IconButton onClick={handleRemove} className="removeComment">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Notify;
