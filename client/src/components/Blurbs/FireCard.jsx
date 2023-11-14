import React, { useState, useEffect } from "react";
import "../../style/Blurbs.css";
import { useMutation } from "@apollo/client";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import WhatshotTwoToneIcon from "@mui/icons-material/WhatshotTwoTone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import auth from "../../utils/auth";
import { ALL_BLURBS } from "../../utils/Queries/queries";
import { 
  LIKE_Blurb,
  UNLIKE_Blurb,
} from "../../utils/mutations/Blurb/BlurbMutations";


function FireCard({ children, username, blurbId, propRefetch, profilePic, likes, liked }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(liked ? liked : false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [likeBlurb] = useMutation(LIKE_Blurb);
  const [unlikeBlurb] = useMutation(UNLIKE_Blurb);

  const handleLike = () => {
    if (isLiked) {
      unlikeBlurb({
        variables: { blurbId },
        refetchQueries: [{ query: ALL_BLURBS }],
      });
    } else {
      likeBlurb({
        variables: { blurbId },
        refetchQueries: [{ query: ALL_BLURBS }],
      });
    }
    setIsLiked(!isLiked);
  };
  // console.log(profilePic);
  // console.log(blurbId);

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

  return (
    <div id="bluMain">
      <div className="blurbContainer">
        <div id="blurbColOne">
          <Avatar
            id="notifyPP"
            className="Blfriend"
            alt={username}
            src={staticImg}
            sx={{ width: 40, height: 40 }}
          />
          {/* <div className="Blfriend" /> */}
          <div className="blInfo">
            <div>
              <div className="userName">{username}</div>
            </div>
            <div>{children}</div>
          </div>
        </div>
        <div id="notifyIcons">
          <IconButton onClick={handleLike} className="likeComment">
            {likes >= 4 ?(
              <>
              <WhatshotIcon 
              style = {{color: "#273Be2", fontSize: "2.3rem", position: "absolute", top: "-13px"}}
              />
              <p className="likesCount" style={{ position: "absolute", top: "-2px"}}>{likes}</p>
              </>
            ) : likes >= 3 ? (
              <>
              <WhatshotIcon 
              style = {{color: "orange", fontSize: "2.3rem", position: "absolute", top: "-13px"}}
              />
              <p className="likesCount" style={{ position: "absolute", top: "-2px"}}>{likes}</p>
              </>
            ) : (
            <WhatshotIcon 
            />
            )}
          </IconButton>
          <IconButton onClick={openModal} className="likeComment">
            <ChatBubbleOutlineIcon
            style={{ position: "absolute", top: "30px", left: "-5px" }} />
          </IconButton>
        </div>
      </div>
      <Modal
        style={{ zIndex: 0 }}
        id="blurbModal"
        open={isModalOpen}
        onClose={closeModal}
      >
        <form id="blForm">
          <TextField id="outlined-basic" label="Comment" variant="outlined" />
          <Button
            style={{ margin: ".5rem" }}
            variant="contained"
            disableElevation
          >
            Comment
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default FireCard;
