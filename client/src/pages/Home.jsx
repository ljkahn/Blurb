import Nav from "../components/NavBar.jsx";
import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Fire from "../components/Blurbs/FireCard";
import BlurbCard from "../components/Blurbs/BlurbCard.jsx";
import BlurbCom from "../components/Blurbs/BlurbComCard.jsx";
// import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@apollo/client";
import { ALL_BLURBS } from "../utils/Queries/queries.js";
import auth from "../utils/auth.js";

function Home() {
  const [blurbs, setBlurbs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { loading, data, refetch } = useQuery(ALL_BLURBS);

  useEffect(() => {
    if (!loading) {
      const allBlurbs = [...data.blurbs];
      const newBlurbs = allBlurbs.slice(); // Create a shallow copy to avoid mutating the original array
      newBlurbs.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
      setBlurbs([...data.blurbs]);
      setLoading(false);
      // console.log(...data.blurbs);
    }
  }, [data]);

  useEffect(() => {
    console.log(data); // Log the data to see its structure
  }, [data]);

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
              username={blurb.blurbAuthor.username}
              profilePic={blurb.blurbAuthor.profile.profilePic}
              liked={blurb.likeList.includes(auth.getProfile().data._id)}
              likes={blurb.likes}
            >
              {blurb.blurbText}
            </BlurbCard>
            {blurb.comments.map((comment) => (
              <BlurbCom
                key={comment._id} // This should be uncommented if comment._id is available
                blurbId={blurb._id}
                commentId={comment._id}
                username={comment?.commentAuthor?.username}
                comments={comment.commentText}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
