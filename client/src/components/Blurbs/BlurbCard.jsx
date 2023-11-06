import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import "../../style/Blurbs.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import auth from "../../utils/auth";
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../../utils/mutations/Likes/CommentMutations";
import { EDIT_Blurb } from "../../utils/mutations/Blurb/BlurbMutations";
import {
  LIKE_Blurb,
  UNLIKE_Blurb,
  REMOVE_Blurb,
} from "../../utils/mutations/Blurb/BlurbMutations";
import { QUERY_MY_PROFILE } from "../../utils/Queries/userQueries";

function BlurbStream({
  children,
  username,
  blurbId,
  onDelete,
  initialBlurbText,
  showEdit,
  profilePic,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { loading, data } = useQuery(QUERY_MY_PROFILE);
  const [blurbIdForEdit, setBlurbIdForEdit] = useState(null);
  // console.log(auth.getProfile());

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
      });
    } else {
      likeBlurb({
        variables: { blurbId },
      });
    }
    setIsLiked(!isLiked);
  };

  const [removeBlurb] = useMutation(REMOVE_Blurb, {
    variables: { blurbId },
    refetchQueries: [{ query: QUERY_MY_PROFILE }],
    onCompleted: () => {
      setIsDeleted(true);
      if (onDelete) onDelete();
    },
    onError: (err) => {
      console.error("Error removing blurb: ", err);
    },
  });

  const handleRemove = async () => {
    try {
      await removeBlurb();
      if (onDelete) {
        onDelete(blurbId);
      }
    } catch (error) {
      console.error("Error removing blurb: ", error);
    }
  };

  const [addComment] = useMutation(ADD_COMMENT);

  const handleComment = async () => {
    try {
      await addComment({
        variables: { blurbId, commentText: commentText },
      });
      setCommentText("");
      closeModal();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const [isEditBlurbModalOpen, setIsEditBlurbModalOpen] = useState(false);
  const [editBlurbText, setEditBlurbText] = useState("");

  const openEditBlurbModal = (initialBlurbText) => {
    setBlurbIdForEdit(blurbId);
    setIsEditBlurbModalOpen(true);
    setEditBlurbText(initialBlurbText);
  };

  const closeEditBlurbModal = () => {
    setIsEditBlurbModalOpen(false);
    setEditBlurbText("");
  };

  const [updateBlurb] = useMutation(EDIT_Blurb);

  const handleEditBlurb = async () => {
    try {
      await updateBlurb({
        variables: {
          blurbId: blurbId,
          blurbText: editBlurbText,
        },
        refetchQueries: [{ query: QUERY_MY_PROFILE }],
      });
    } catch (error) {
      console.error("Error updating blurb:", error);
    }
    closeEditBlurbModal();
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

  const [removeComment] = useMutation(REMOVE_COMMENT);

  const handleDeleteComment = async (commentId) => {
    try {
      await removeComment({
        variables: { commentId },
      });
    } catch (error) {
      console.error("Error removing comment:", error);
    }
  };

  if (isDeleted) return null;

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
          <div className="blInfo">
            <div>
              <div className="userName">{username}</div>
            </div>
            <div>{children}</div>
          </div>
        </div>
        <div id="notifyIcons">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconButton onClick={handleLike} className="likeComment">
              {isLiked ? <FavoriteIcon style={{color: "red"}} /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton onClick={openModal} className="likeComment">
              <ChatBubbleOutlineIcon />
            </IconButton>
          </div>
          <div>
            {showEdit && (
              <IconButton
                onClick={() => openEditBlurbModal(initialBlurbText)}
                className="editBlurb"
              >
                <EditIcon />
              </IconButton>
            )}
          </div>
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
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            className="modalButton"
            style={{ margin: ".5rem" }}
            variant="contained"
            disableElevation
            onClick={handleComment}
          >
            Comment
          </Button>
          <Button className="modalButton" onClick={closeModal}>
            Cancel
          </Button>
        </form>
      </Modal>{" "}
      <Modal
        style={{ zIndex: 0 }}
        id="editBlurbModal"
        open={isEditBlurbModalOpen}
        onClose={closeEditBlurbModal}
      >
        <form id="blForm">
          <TextField
            id="outlined-basic"
            label="Edit Blurb"
            variant="outlined"
            value={editBlurbText || ""}
            onChange={(e) => setEditBlurbText(e.target.value)}
          />
          <Button
            className="modalButton"
            style={{ margin: ".5rem" }}
            variant="contained"
            disableElevation
            onClick={handleEditBlurb}
          >
            Save Changes
          </Button>
          <Button
            onClick={handleRemove}
            className="removeComment, deleteButton"
          >
            Delete Blurb
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default BlurbStream;
