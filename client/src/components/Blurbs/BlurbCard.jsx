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
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   ADD_COMMENT,
//   REMOVE_COMMENT,
//   EDIT_COMMENT,
// } from "../../utils/mutations/Likes/CommentMutations";
// import {
//   LIKE_Blurb,
//   UNLIKE_Blurb,
//   REMOVE_Blurb,
// } from "../../utils/mutations/Blurb/BlurbMutations";

// function BlurbStream({ children, username, blurbId, comments }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [isDeleted, setIsDeleted] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const [likeBlurb] = useMutation(LIKE_Blurb);
//   const [unlikeBlurb] = useMutation(UNLIKE_Blurb);
//   const handleLike = () => {
//     if (isLiked) {
//       // If already liked, unlike the blurb
//       unlikeBlurb({
//         variables: { blurbId },
//       });
//     } else {
//       // If not liked, like the blurb
//       likeBlurb({
//         variables: { blurbId },
//       });
//     }
//     setIsLiked(!isLiked); // Toggle the liked state
//   };

//   const [removeBlurb] = useMutation(REMOVE_Blurb, {
//     variables: { blurbId },
//     onCompleted: () => {
//       setIsDeleted(true);
//     },
//     onError: (err) => {
//       console.error("Error removing blurb: ", err);
//     },
//   });

//   const handleRemove = async () => {
//     await removeBlurb();
//   };

//   //add comment
//   const [addComment] = useMutation(ADD_COMMENT);
//   const handleComment = async () => {
//     console.log(commentText); // Log the comment text
//     try {
//       await addComment({
//         variables: {
//           blurbId: "654676b83ac2a6d51c0ae1e9",
//           commentText: commentText,
//         },
//       });
//       setCommentText(""); // Clear the comment input field
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   //remove comment
//   const [removeComment] = useMutation(REMOVE_COMMENT); // Import the REMOVE_COMMENT mutation
//   const handleDeleteComment = async (commentId) => {
//     try {
//       await removeComment({
//         variables: { commentId },
//       });
//     } catch (error) {
//       console.error("Error removing comment:", error);
//     }
//   };

//   const [editComment] = useMutation(EDIT_COMMENT); // Use the EDIT_COMMENT mutation
//   const handleEditComment = async () => {
//     try {
//       await editComment({
//         variables: { commentId: commentId, commentText: editedCommentText },
//       });
//       setIsEditing(false); // Disable editing mode after saving
//     } catch (error) {
//       console.error("Error editing comment:", error);
//     }
//   };

//   if (isDeleted) return null;
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
//             {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//           </IconButton>
//           <IconButton onClick={openModal} className="likeComment">
//             <ChatBubbleOutlineIcon />
//           </IconButton>
//           <IconButton onClick={handleRemove} className="removeComment">
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       </div>
//       <Modal
//         style={{ zIndex: 0 }}
//         id="blurbModal"
//         open={isModalOpen}
//         onClose={closeModal}
//       >
//         <form id="blForm">
//           <TextField id="outlined-basic" label="Comment" variant="outlined" />
//           <Button
//             style={{ margin: ".5rem" }}
//             variant="contained"
//             disableElevation
//           >
//             Comment
//           </Button>
//         </form>
//       </Modal>
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

// // import React, { useState } from "react";
// // import { useMutation } from "@apollo/client";
// // import "../../style/Blurbs.css";
// // import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// // import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// // import Avatar from "@mui/material/Avatar";
// // import IconButton from "@mui/material/IconButton";
// // import Modal from "@mui/material/Modal";
// // import TextField from "@mui/material/TextField";
// // import Button from "@mui/material/Button";
// // import {
// //   LIKE_Blurb,
// //   EDIT_Blurb,
// //   UNLIKE_Blurb,
// // } from "../../utils/mutations/Blurb/BlurbMutations";
// // import FavoriteIcon from "@mui/icons-material/Favorite";
// // import { ADD_COMMENT } from "../../utils/mutations/Likes/CommentMutations";

// // function BlurbStream({ children, username, blurbId, initialBlurbText }) {
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [commentText, setCommentText] = useState("");
// //   const [editedBlurbText, setEditedBlurbText] = useState(initialBlurbText);
// //   const [isLiked, setIsLiked] = useState(false); // Add isLiked to the state and initialize it

// //   const openModal = () => {
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //   };

// //   const [editBlurb] = useMutation(EDIT_Blurb);
// //   const [unlikeBlurb] = useMutation(UNLIKE_Blurb);
// //   const [addComment] = useMutation(ADD_COMMENT);

// //   const handleLike = () => {
// //     if (isLiked) {
// //       // If already liked, unlike the blurb
// //       unlikeBlurb({
// //         variables: { blurbId },
// //       });
// //     } else {
// //       // If not liked, like the blurb
// //       likeBlurb({
// //         variables: { blurbId },
// //       });
// //     }
// //     setIsLiked(!isLiked); // Toggle the liked state
// //   };

// //   const handleComment = async () => {
// //     console.log(commentText); // Log the comment text
// //     try {
// //       await addComment({
// //         variables: { blurbId, commentText: commentText },
// //       });
// //       setCommentText(""); // Clear the comment input field
// //     } catch (error) {
// //       console.error("Error adding comment:", error);
// //     }
// //   };

// //   const handleEditBlurb = () => {
// //     editBlurb({
// //       variables: { blurbId, blurbText: editedBlurbText },
// //     })
// //       .then((result) => {
// //         console.log("Blurb edited successfully:", result);
// //         closeModal(); // Close the modal after saving the edits
// //       })
// //       .catch((error) => {
// //         console.error("Error editing blurb:", error);
// //       });
// //   };

// //   return (
// //     <div id="bluMain">
// //       <div className="blurbContainer">
// //         <div id="blurbColOne">
// //           <div className="blInfo">
// //             <div>
// //               <div className="userName">{username}</div>
// //             </div>
// //             <div>{children}</div>
// //           </div>
// //         </div>
// //         <div id="notifyIcons">
// //           <IconButton onClick={handleLike} className="likeComment">
// //             {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
// //           </IconButton>
// //           <IconButton onClick={openModal} className="likeComment">
// //             <ChatBubbleOutlineIcon />
// //           </IconButton>
// //           <Button variant="text" onClick={openModal}>
// //             Edit
// //           </Button>
// //         </div>
// //       </div>
// //       <Modal
// //         style={{ zIndex: 0 }}
// //         id="blurbModal"
// //         open={isModalOpen}
// //         onClose={closeModal}
// //         value={commentText}
// //         onChange={(e) => setCommentText(e.target.value)}
// //       >
// //         <form id="blForm">
// //           <TextField id="outlined-basic" label="Comment" variant="outlined" />
// //           <Button
// //             style={{ margin: ".5rem" }}
// //             variant="contained"
// //             disableElevation
// //             onClick={handleComment}
// //           >
// //             Comment
// //           </Button>
// //         </form>
// //       </Modal>
// //       <Modal
// //         style={{ zIndex: 0 }}
// //         id="blurbModal"
// //         open={isModalOpen}
// //         onClose={closeModal}
// //       >
// //         <div id="blForm">
// //           <TextField
// //             id="outlined-basic"
// //             label="Edit Blurb"
// //             variant="outlined"
// //             value={editedBlurbText}
// //             onChange={(event) => setEditedBlurbText(event.target.value)}
// //           />
// //           <Button
// //             style={{ margin: ".5rem" }}
// //             variant="contained"
// //             disableElevation
// //             onClick={handleEditBlurb}
// //           >
// //             Save Edits
// //           </Button>
// //           <Button
// //             style={{ margin: ".5rem" }}
// //             variant="contained"
// //             disableElevation
// //             onClick={closeModal}
// //           >
// //             Cancel
// //           </Button>
// //         </div>
// //       </Modal>
// //     </div>
// //   );
// // }

// // export default BlurbStream;

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
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
