import React, { useState } from "react";
import "../../style/Blurbs.css";
import { useMutation } from "@apollo/client";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LIKE_Blurb } from "../../utils/mutations/Blurb/BlurbMutations";

function FireCard({ children, username, blurbId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [likeBlurb] = useMutation(LIKE_Blurb);

  const handleLike = () => {
    likeBlurb({
      variables: { blurbId },
    });
  };
  console.log(blurbId);

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
              <div className="userName">{username}</div>
            </div>
            <div>{children}</div>
          </div>
        </div>
        <div id="notifyIcons">
          <IconButton onClick={handleLike} className="likeComment">
            <WhatshotIcon />
          </IconButton>
          <IconButton onClick={openModal} className="likeComment">
            <ChatBubbleOutlineIcon />
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
