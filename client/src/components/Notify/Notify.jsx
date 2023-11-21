import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import "../../style/Blurbs.css";
import { REMOVE_Blurb } from "../../utils/mutations/Blurb/BlurbMutations";
import { useMutation } from "@apollo/client";
import { QUERY_GET_NOTIFICATIONS } from "../../utils/Queries/userQueries";

function Notify({ blurbId, username, type, profilePic }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [removeBlurb] = useMutation(REMOVE_Blurb, {
    variables: { blurbId },
    onCompleted: () => {
      setIsDeleted(true);
    },
    onError: (err) => {
      console.error("Error removing blurb: ", err);
    },
  });

  const handleRemove = async () => {
    await removeBlurb();
  };

  const sample = "cld-sample-5";
  const cloudName = "dmnfg3ids";
  const [staticImg, setStaticPic] = useState(
    `https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${sample}.png`
  );

  useEffect(() => {
    if (profilePic) {
      setStaticPic(
        `https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${profilePic}.png`
      );
    }
  }, [profilePic]);

  if (isDeleted) return <p>Successfully deleted</p>;

  return (
    <div id="bluMain">
      <div></div>
      <div className="blurbContainer">
        <div id="blurbColOne">
          <Avatar
            id="notifyPP"
            className="Blfriend"
            alt="Remy Sharp"
            src={staticImg}
            sx={{ width: 40, height: 40 }}
          />
          <div>
            <div className="blInfo">
              <div>
                <div className="userName">
                  {username} {type}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="notifyIcons" style={{ alignItems: "center" }}>
          <RemoveRedEyeOutlinedIcon />
          <IconButton onClick={handleRemove} className="removeComment">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Notify;
