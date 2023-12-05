import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import BlurbCard from "../Blurbs/BlurbCard.jsx";
import BlurbCom from "../Blurbs/BlurbComCard.jsx"
import { useQuery } from "@apollo/client";
import { ALL_BLURBS } from "../../utils/Queries/queries.js";
import auth from '../../utils/auth.js';

function Global() {
  const [blurbs, setBlurbs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { loading, data, error, refetch } = useQuery(ALL_BLURBS);
  // const {loading, data, error, refetch} = useQuery(FOLLOWED_USERS_BLURBS);

  useEffect(() => {
    if (!loading && data) {
      const allBlurbs = [...data.blurbs,];
      const newBlurbs = allBlurbs.slice(); // Create a shallow copy to avoid mutating the original array
      newBlurbs.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
      setBlurbs([...data.blurbs]);
      setLoading(false);
      // refetch();
    }
  }, [loading, data]);

  if (error) {
    return <div>Error loading data!</div>
  }

// console.log(blurbs);

  return (
    <div>
{isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#F7E258"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        blurbs.map((blurb) => (
          <div key={blurb._id}>
            <BlurbCard
              propRefetch={refetch}
              // key={i}
              blurbId={blurb._id}
              username={blurb.blurbAuthor?.username}
              profilePic={blurb.blurbAuthor?.profile?.profilePic || ''}
              liked={blurb.likeList.includes(auth.getProfile().data._id)}
              likes={blurb.likes}
              tags={blurb.tags.map((tag, tagIndex) => (
                <div className="tag" key={tagIndex}>#{tag}</div>
                ))}
            >
              {blurb.blurbText}
            </BlurbCard>
            {blurb.comments.map((comment) => (
              <BlurbCom
                // propRefetch={refetch}
                key={comment._id} // This should be uncommented if comment._id is available
                blurbId={blurb._id}
                commentId={comment._id}
                username={comment?.commentAuthor?.username}
                comments={comment.commentText}
                liked={comment.likeList.includes(auth.getProfile().data._id)}
                likes={comment.likes}
              />
            ))}
          </div>
        ))
      )}
    </div>
    
  )
}

export default Global