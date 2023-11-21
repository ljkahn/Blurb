import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../style/Blurbs.css";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { FIND_BLURB_BY_ID } from "../../utils/Queries/queries";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
} from "../../utils/mutations/Likes/CommentMutations";
import { ALL_BLURBS } from "../../utils/Queries/queries";
import { QUERY_MY_PROFILE } from "../../utils/Queries/userQueries";
import { REMOVE_COMMENT } from "../../utils/mutations/Likes/CommentMutations";

function BlurbCom({
  blurbId,
  comments,
  commentId,
  username,
  likes,
  liked,
  onDeleteComment,
}) {
  const [isLiked, setIsLiked] = useState(liked ? liked : false);
  const { loading: userLoading, data: userData } = useQuery(QUERY_MY_PROFILE);

  const { loading, data, error } = useQuery(FIND_BLURB_BY_ID, {
    variables: { blurbId },
  });

  const [likeComment] = useMutation(ADD_COMMENT_LIKE);
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
        refetchQueries: [{ query: ALL_BLURBS }],
      });
    } else {
      // If not liked, like the comment
      console.log("comment id: ", commentId);
      console.log("blurb id: ", blurbId);
      likeComment({
        variables: { commentId, blurbId },
        refetchQueries: [{ query: ALL_BLURBS }],
      });
    }
    setIsLiked(!isLiked); // Toggle the liked state
  };

  const [removeComment] = useMutation(REMOVE_COMMENT);
  const handleRemove = async () => {
    try {
      await removeComment({
        variables: { commentId, blurbId },
        refetchQueries: [{ query: ALL_BLURBS }],
      });

      onDeleteComment && onDeleteComment(commentId);
    } catch (error) {
      console.error("Error removing comment:", error);
    }
  };

  return (
    <div id="bluMain">
      <div className="blurbContainer comContainer">
        <div id="blurbColOne">
          <div className="blInfoCom">
            <div>
              <div className="userName">{username}</div>
            </div>
            {comments}
          </div>
        </div>
        <div id="notifyIconsCom">
          <div>
            <IconButton onClick={handleCommentLike} className="likeComment">
              {isLiked ? (
                <>
                  <FavoriteIcon
                    style={{
                      color: "red",
                      fontSize: "2.1rem",
                      position: "absolute",
                      top: "-10px",
                    }}
                  />
                  <p className="likesCount">{likes}</p>
                </>
              ) : (
                <>
                  <FavoriteBorderIcon
                    style={{
                      fontSize: "2.1rem",
                      position: "absolute",
                      top: "-10px",
                    }}
                  />
                  <p className="likesCount">{likes}</p>
                </>
              )}
            </IconButton>
            <IconButton onClick={handleRemove} className="removeComment">
              <DeleteIcon style={{ fontSize: "2.1rem", top: "-10px" }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlurbCom;
