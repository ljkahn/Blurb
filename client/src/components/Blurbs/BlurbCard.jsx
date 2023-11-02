import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import "../../style/Blurbs.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Avatar from "@mui/material/Avatar";
import { Link, dividerClasses } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import {
  ADD_Blurb,
  REMOVE_Blurb,
  EDIT_Blurb,
  LIKE_Blurb,
  UNLIKE_Blurb,
} from "../../utils/mutations/Blurb/BlurbMutations";
import { QUERY_Blurbs } from "../../utils/Queries/queries";
import { useNavigate } from "react-router-dom";

function BlurbStream() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { loading, data } = useQuery(QUERY_Blurbs);

  const blurbs = data?.blurbs || [];

  //if statement

  console.log(blurbs[0].blurbText);

  return (
    <>
      <h1>Blurb</h1>
    </>
  );
}

export default BlurbStream;
// <div id="bluMain">
//   <div className="blurbContainer">
//     <div id="blurbColOne">
//       {/* <Avatar
//         id="notifyPP"
//         className="Blfriend"
//         alt="Remy Sharp"
//         src=""
//         sx={{ width: 40, height: 40 }}
//       /> */}
//       {/* <div className="Blfriend" /> */}
//       <div className="blInfo">
//         <div>
//           <div className="userName">Jenny</div>
//         </div>
//         <div>once i was a frog that got eaten by a dog</div>
//       </div>
//     </div>
//     <div id="notifyIcons">
//       <div className="likeComment">
//         <FavoriteBorderIcon />
//       </div>
//       <IconButton onClick={openModal} className="likeComment">
//         <ChatBubbleOutlineIcon />
//       </IconButton>
//     </div>
//   </div>
//   <Modal
//     style={{ zIndex: 0 }}
//     id="blurbModal"
//     open={isModalOpen}
//     onClose={closeModal}
//   >
//     <form id="blForm">
//       <TextField id="outlined-basic" label="Comment" variant="outlined" />
//       <Button
//         style={{ margin: ".5rem" }}
//         variant="contained"
//         disableElevation
//       >
//         Comment
//       </Button>
//     </form>
//   </Modal>
// </div>
