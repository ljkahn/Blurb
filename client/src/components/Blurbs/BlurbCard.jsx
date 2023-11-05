import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import "../../style/Blurbs.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  LIKE_Blurb,
  UNLIKE_Blurb,
  REMOVE_Blurb,
} from "../../utils/mutations/Blurb/BlurbMutations";
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
} from "../../utils/mutations/Likes/CommentMutations";
import { QUERY_MY_PROFILE } from "../../utils/Queries/userQueries";

function BlurbStream({
  children,
  username,
  blurbId,
  comments,
  isLiked,
  onDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [commentId, setCommentId] = useState("");
  const { loading, data } = useQuery(QUERY_MY_PROFILE);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false); // Close the editing mode when the modal is closed
  };

  const [likeBlurb] = useMutation(LIKE_Blurb);
  const [unlikeBlurb] = useMutation(UNLIKE_Blurb);

  const handleLike = () => {
    if (isLiked) {
      // If already liked, unlike the blurb
      unlikeBlurb({
        variables: { blurbId },
      });
    } else {
      // If not liked, like the blurb
      likeBlurb({
        variables: { blurbId },
      });
    }
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
    console.log("Attempting to remove blurb with ID:", blurbId);
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
      console.log(blurbId);
      console.log(commentText);
      await addComment({
        variables: {
          blurbId: blurbId,
          commentText: commentText,
        },
      });
      setCommentText(""); // Clear the comment input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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

  const handleEditComment = () => {
    // Use the editedCommentText and commentId to update the comment
    // You should have a way to set the commentId when editing a comment
    // In your UI, you can set commentId when clicking on the comment to edit
    if (commentId) {
      // Make sure to use the correct variables in the editComment mutation
      editComment({
        variables: { commentId: commentId, commentText: editedCommentText },
      });
    }
    closeModal(); // Close the modal after saving the edits
  };

  if (isDeleted) return null;

  return (
    <div id="bluMain">
      <div className="blurbContainer">
        <div id="blurbColOne">
          <div className="blInfo">
            <div>
              <div className="userName">{username}</div>
            </div>
            <div>{children}</div>
          </div>
        </div>
        <div id="notifyIcons">
          <IconButton onClick={handleLike} className="likeComment">
            {isLiked ? <FavoriteIcon /> : <FavoriteIcon />}
          </IconButton>
          <IconButton onClick={openModal} className="likeComment">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton onClick={handleRemove} className="removeComment">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <Modal
        style={{ zIndex: 0 }}
        id="blurbModal"
        open={isModalOpen}
        onClose={closeModal}
      >
        <div id="blForm">
          {isEditing ? (
            <>
              <TextField
                id="outlined-basic"
                label="Edit Comment"
                variant="outlined"
                value={editedCommentText}
                onChange={(e) => setEditedCommentText(e.target.value)}
              />
              <Button
                style={{ margin: ".5rem" }}
                variant="contained"
                disableElevation
                onClick={handleEditComment}
              >
                Save Edits
              </Button>
            </>
          ) : (
            <>
              <TextField
                id="outlined-basic"
                label="Comment"
                variant="outlined"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button
                style={{ margin: ".5rem" }}
                variant="contained"
                disableElevation
                onClick={handleComment}
              >
                Comment
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default BlurbStream;
