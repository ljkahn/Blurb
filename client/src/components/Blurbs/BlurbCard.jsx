import React, { useState } from "react";
import "../../style/Blurbs.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Avatar from "@mui/material/Avatar";
import { Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function BlurbStream({ children, username }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <div className="likeComment">
            <FavoriteBorderIcon />
          </div>
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

export default BlurbStream;
