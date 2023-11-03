import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import "../../style/Blurbs.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LIKE_Blurb } from "../../utils/mutations/Blurb/BlurbMutations";
import { ADD_COMMENT } from "../../utils/mutations/Likes/CommentMutations";

function BlurbStream({ children, username, blurbId, commentText }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comText, setComText] = useState("");

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
  // console.log(blurbId);

  const [addComment] = useMutation(ADD_COMMENT);

  console.log(useMutation);
  const handleComment = async () => {
    try {
      await addComment({
        variables: { commentText, blurbId },
      });
      setComText(""); // Clear the comment input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div id="bluMain">
      <div className="blurbContainer">
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
              <div className="userName">{username}</div>
            </div>
            <div>{children}</div>
          </div>
        </div>
        <div id="notifyIcons">
          <IconButton onClick={handleLike} className="likeComment">
            <FavoriteBorderIcon />
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
          <TextField
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            value={comText}
            onChange={(e) => setComText(e.target.value)}
          />
          <Button
            style={{ margin: ".5rem" }}
            variant="contained"
            disableElevation
            onClick={handleComment}
          >
            Comment
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default BlurbStream;
