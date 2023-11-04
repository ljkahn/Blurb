import React from "react";
import "../../style/Blurbs.css";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { GET_BLURB_BY_ID } from "../../utils/Queries/queries";
import { useQuery } from "@apollo/client";

function BlurbCom({ blurbId }) {
  const { loading, data } = useQuery(GET_BLURB_BY_ID, {
    variables: { blurbId },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.findBlurbById) {
    console.log("Data is missing expected properties:", data); // Add this line for debugging
    return <p>Data is missing expected properties.</p>;
  }

  console.log("Data:", data); // Add this line for debugging

  const blurb = data.findBlurbById;

  //   return (
  //     <div>
  //       <div id="bluMain">
  //         <div className="blurbContainer comContainer">
  //           <div id="blurbColOne">
  //             {/* <Avatar
  //               id="notifyPP"
  //               className="Blfriend"
  //               alt="Remy Sharp"
  //               src="/static/images/avatar/1.jpg"
  //               sx={{ width: 40, height: 40 }}
  //             /> */}
  //             {/* <div className="Blfriend" /> */}
  //             <div className="blInfo">
  //               <div>
  //                 <div className="userName">Jenny</div>
  //               </div>
  //               {userData.blurbs &&
  //                 userData.blurbs.map((blurbs, index, commentId) => (
  //                   <>
  //                     <BlurbStream
  //                       key={index}
  //                       blurbId={blurbs._id}
  //                       // username={blurbs.username}
  //                       comments={blurbs.comments}
  //                     >
  //                       {blurbs.blurbText}
  //                     </BlurbStream>
  //                   </>
  //                 ))}
  //             </div>
  //           </div>
  //           <div className="likeComment">
  //             <FavoriteBorderIcon />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div id="bluMain">
      <div className="blurbContainer comContainer">
        <div id="blurbColOne">
          <div className="blInfo">
            <div>
              <div className="userName">{blurb.blurbAuthor.username}</div>
            </div>
            {blurb.comments.map((comment) => (
              <div key={comment._id} className="comment">
                {comment.commentText}
              </div>
            ))}
          </div>
        </div>
        <div className="likeComment">
          <FavoriteBorderIcon />
        </div>
      </div>
    </div>
  );
}

export default BlurbCom;
