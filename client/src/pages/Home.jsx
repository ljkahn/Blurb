import Nav from "../components/NavBar.jsx";
import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Fire from "../components/Blurbs/FireCard";
import BlurbCard from "../components/Blurbs/BlurbCard.jsx";
import BlurbCom from "../components/Blurbs/BlurbComCard.jsx";
// import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@apollo/client";
// import { ALL_BLURBS } from "../utils/Queries/queries.js";
import auth from "../utils/auth.js";
import { FOLLOWED_USERS_BLURBS } from "../utils/Queries/userQueries.js";
import Global from "../components/Blurbs/Global.jsx";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import "../style/Header.css";
import "../style/Blurbs.css";

function Home() {
  const [isLoading, setLoading] = useState(true);
  const { loading, data, error, refetch } = useQuery(FOLLOWED_USERS_BLURBS);
  const [followedUsersBlurbs, setBlurbs] = useState([]);
  const [globalBlurbs, setGlobalBlurbs] = useState(false);
  const [followedBlurbs, setFollowedBlurbs] = useState(true);
  const [currentComponent, setCurrentComponent] = useState("global");

  const handleGlobalToggle = () => {
    setGlobalBlurbs(true);
    setFollowedBlurbs(false);
    setCurrentComponent("global");
    refetch();
  };

  const handleFollowedToggle = () => {
    setGlobalBlurbs(false);
    setFollowedBlurbs(true);
    setCurrentComponent("followed");
    refetch();
  };

  useEffect(() => {
    if (!loading && data) {
      const allBlurbs = [...data.followedUsersBlurbs];
      const newBlurbs = allBlurbs.slice(); // Create a shallow copy to avoid mutating the original array
      newBlurbs.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
      setBlurbs([...data.followedUsersBlurbs]);
      setLoading(false);
      // refetch();
    }
  }, [loading, data]);

  if (error) {
    return <div>Error loading data!</div>;
  }

  // useEffect(() => {
  //   // console.log(data); // Log the data to see its structure
  //   refetch();
  // }, [data]);

  // useEffect(() => {
  //   console.log(data); // Log the data to see its structure
  //   refetch();
  // }, [data]);

  console.log(globalBlurbs);

  return (
    <div>
      <div className="toggleContain">
        <ToggleButtonGroup id="homeToggle">
          <ToggleButton
            value={true}
            onClick={handleFollowedToggle}
            className={currentComponent === "followed" ? "active" : ""}
          >
            <Diversity3Icon style={{ color: "#212121" }} />
          </ToggleButton>
          <ToggleButton
            value={false}
            onClick={handleGlobalToggle}
            className={currentComponent === "global" ? "active" : ""}
          >
            <PublicIcon style={{ color: "#212121" }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
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
      ) : currentComponent === "followed" ? (
        followedUsersBlurbs.map((blurb, blurbIndex) => (
          <div key={blurb._id}>
            <BlurbCard
              propRefetch={refetch}
              key={blurb._id}
              blurbId={blurb._id}
              username={blurb.blurbAuthor.username}
              profilePic={blurb.blurbAuthor?.profile?.profilePic || ""}
              liked={blurb.likeList.includes(auth.getProfile().data._id)}
              likes={blurb.likes}
              tags={blurb.tags.map((tag, tagIndex) => (
                <div className="tag" id={tagIndex}>#{tag}</div>
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
      ) : (
        <Global />
      )}
    </div>
  );
}

export default Home;
