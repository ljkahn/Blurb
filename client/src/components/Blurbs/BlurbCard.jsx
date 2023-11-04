// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import "../../style/Blurbs.css";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Modal from "@mui/material/Modal";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { LIKE_Blurb } from "../../utils/mutations/Blurb/BlurbMutations";
// import { ADD_COMMENT } from "../../utils/mutations/Likes/CommentMutations";

// function BlurbStream({ children, username, blurbId }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [commentText, setCommentText] = useState("");

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const [likeBlurb] = useMutation(LIKE_Blurb);

//   const handleLike = () => {
//     likeBlurb({
//       variables: { blurbId },
//     });
//   };

//   const [addComment] = useMutation(ADD_COMMENT);
//   const handleComment = async () => {
//     console.log(commentText); // Log the comment text
//     try {
//       await addComment({
//         variables: { blurbId, commentText: commentText },
//       });
//       setCommentText(""); // Clear the comment input field
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   return (
//     <div id="bluMain">
//       <div className="blurbContainer">
//         <div id="blurbColOne">
//           {/* <Avatar
//             id="notifyPP"
//             className="Blfriend"
//             alt="Remy Sharp"
//             src="/static/images/avatar/1.jpg"
//             sx={{ width: 40, height: 40 }}
//           /> */}
//           {/* <div className="Blfriend" /> */}
//           <div className="blInfo">
//             <div>
//               <div className="userName">{username}</div>
//             </div>
//             <div>{children}</div>
//           </div>
//         </div>
//         <div id="notifyIcons">
//           <IconButton onClick={handleLike} className="likeComment">
//             <FavoriteBorderIcon />
//           </IconButton>
//           <IconButton onClick={openModal} className="likeComment">
//             <ChatBubbleOutlineIcon />
//           </IconButton>
//         </div>
//       </div>
//       <Modal
//         style={{ zIndex: 0 }}
//         id="blurbModal"
//         open={isModalOpen}
//         onClose={closeModal}
//         value={commentText}
//         onChange={(e) => setCommentText(e.target.value)}
//       >
//         <form id="blForm">
//           <TextField id="outlined-basic" label="Comment" variant="outlined" />
//           <Button
//             style={{ margin: ".5rem" }}
//             variant="contained"
//             disableElevation
//             onClick={handleComment}
//           >
//             Comment
//           </Button>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default BlurbStream;

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
import {
  LIKE_Blurb,
  EDIT_Blurb,
  UNLIKE_Blurb,
} from "../../utils/mutations/Blurb/BlurbMutations";
import FavoriteIcon from "@mui/icons-material/Favorite";

function BlurbStream({ children, username, blurbId, initialBlurbText }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editedBlurbText, setEditedBlurbText] = useState(initialBlurbText);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [editBlurb] = useMutation(EDIT_Blurb);
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
    setIsLiked(!isLiked); // Toggle the liked state
  };

  const handleComment = async () => {
    // Implement your comment functionality here
  };

  const handleEditBlurb = () => {
    editBlurb({
      variables: { blurbId, blurbText: editedBlurbText },
    })
      .then((result) => {
        console.log("Blurb edited successfully:", result);
        closeModal(); // Close the modal after saving the edits
      })
      .catch((error) => {
        console.error("Error editing blurb:", error);
      });
  };

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
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={openModal} className="likeComment">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Button variant="text" onClick={openModal}>
            Edit
          </Button>
        </div>
      </div>
      <Modal
        style={{ zIndex: 0 }}
        id="blurbModal"
        open={isModalOpen}
        onClose={closeModal}
      >
        <div id="blForm">
          <TextField
            id="outlined-basic"
            label="Edit Blurb"
            variant="outlined"
            value={editedBlurbText}
            onChange={(event) => setEditedBlurbText(event.target.value)}
          />
          <Button
            style={{ margin: ".5rem" }}
            variant="contained"
            disableElevation
            onClick={handleEditBlurb}
          >
            Save Edits
          </Button>
          <Button
            style={{ margin: ".5rem" }}
            variant="contained"
            disableElevation
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default BlurbStream;
