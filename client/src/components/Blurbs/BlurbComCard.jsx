import React, { useState, useEffect } from "react";
import "../../style/Blurbs.css";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FIND_BLURB_BY_ID } from "../../utils/Queries/queries";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
} from "../../utils/mutations/Likes/CommentMutations";

// function BlurbCom({ blurbId, comments, commentId }) {
//   const [isLiked, setIsLiked] = useState(false);
//   const { loading, data, error } = useQuery(FIND_BLURB_BY_ID, {
//     variables: { blurbId },
//   });
//   const [likeComment] = useMutation(ADD_COMMENT_LIKE);
//   const [unlikeComment] = useMutation(REMOVE_COMMENT_LIKE);

//   useEffect(() => {
//     if (error) {
//       console.log(JSON.stringify(error));
//     }
//   }, [error]);

//   useEffect(() => {
//     if (!loading && data && data.findBlurbById) {
//       console.log("Data:", data); // Add this line for debugging
//       const blurb = data.findBlurbById;
//       // Additional logic or processing with the blurb data here
//     }
//   }, [data, loading]);

//   const handleCommentLike = () => {
//     if (isLiked) {
//       // If already liked, unlike the comment
//       unlikeComment({
//         variables: { commentId },
//       });
//     } else {
//       // If not liked, like the comment
//       likeComment({
//         variables: { commentId },
//       });
//     }
//     setIsLiked(!isLiked); // Toggle the liked state
//   };

//   return (
//     <div id="bluMain">
//       <div className="blurbContainer comContainer">
//         <div id="blurbColOne">
//           <div className="blInfo">
//             <div>
//               <div className="userName">
//                 {data?.findBlurbById?.blurbAuthor.username}
//               </div>
//             </div>
//             {comments}
//           </div>
//         </div>
//         <div className="likeComment">
//           <FavoriteBorderIcon onClick={handleCommentLike} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlurbCom;

function BlurbCom({ blurbId, comments, commentId, username}) {
  const [isLiked, setIsLiked] = useState(false);

  const { loading, data, error } = useQuery(FIND_BLURB_BY_ID, {
    variables: { blurbId },
  });
  const [likeComment, { error: likeError }] = useMutation(ADD_COMMENT_LIKE);
  if (likeError) {
    console.log(JSON.stringify(likeError));
  }
  const [unlikeComment] = useMutation(REMOVE_COMMENT_LIKE);

  useEffect(() => {
    if (error) {
      console.log(JSON.stringify(error));
    }
  }, [error]);

  useEffect(() => {
    if (!loading && data && data.findBlurbById) {

      // console.log("Data:", data); 
      const blurb = data.findBlurbById;
      

    }
  }, [data, loading]);

  const handleCommentLike = () => {
    if (isLiked) {
      // If already liked, unlike the comment
      unlikeComment({
        variables: { commentId, blurbId },
      });
    } else {
      // If not liked, like the comment
      console.log("comment id: ", commentId);
      console.log("blurb id: ", blurbId);
      likeComment({
        variables: { commentId, blurbId },
      });
    }
    setIsLiked(!isLiked); // Toggle the liked state
  };

  useEffect(() => {
    console.log(data); // Log the data to see its structure
  }, [data]);

  return (
    <div id="bluMain">
      <div className="blurbContainer comContainer">
        <div id="blurbColOne">
          <div className="blInfo">
            <div>
              <div className="userName">
                {username}
              </div>
            </div>
            {comments}
          </div>
        </div>
        <div className="likeComment">
          <FavoriteBorderIcon onClick={handleCommentLike} />
        </div>
      </div>
    </div>
  );
}

export default BlurbCom;
