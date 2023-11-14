import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Fire from "../components/Blurbs/FireCard";
// import BlurbCard from "../components/Blurbs/BlurbCard.jsx";
// import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@apollo/client";
import { ALL_BLURBS } from "../utils/Queries/queries.js";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "../style/Flame.css"
import Tooltip from "@mui/material/Tooltip";
import auth from "../utils/auth.js";

function Flame(liked, likes, registered) {
  const [blurbs, setBlurbs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { loading, data, refetch } = useQuery(ALL_BLURBS);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    if (!loading) {
      const allBlurbs = [...data.blurbs];
      console.log(allBlurbs);
      // Filter Blurbs with more than 10 likes
      const popularBlurbs = allBlurbs.filter((blurb) => blurb.likeList.length >= 3);

      // Sort filtered Blurbs in descending order by the number of likes
      popularBlurbs.sort((a, b) => b.likeList.length - a.likeList.length);

      setBlurbs(popularBlurbs);
      setLoading(false);
      refetch();
    }
  }, [loading, data]);

  useEffect(() => {
    if (registered) {
      // refetch();
    }
    if (!loading) {
      // console.log(data.me);
      setUserData(data.me);
      // refetch();
    }
  }, [loading, registered]);

  console.log(blurbs);

  return (
    <div>
      <div id="flameContain">
        <Tooltip  title="A blurb with a orange flame has 10 or more likes. The flame icon can be clicked to like the Blurb."
        enterTouchDelay={0}
        leaveTouchDelay={2000}
        >
      <WhatshotIcon id="redFlame" />
      </Tooltip>
      <Tooltip title="A blurb with a blue flame has 20 or more likes. The flame icon can be clicked on to like the Blurb."
      enterTouchDelay={0}
      leaveTouchDelay={2000}
      >
      <WhatshotIcon id="blueFlame"/>
      </Tooltip>
      </div>

      {isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        blurbs.map((blurb) => (
          <Fire
            propRefetch={refetch}
            key={blurb._id}
            blurbId={blurb._id}
            username={blurb.blurbAuthor.username}
            profilePic={blurb.blurbAuthor.profile.profilePic}
            liked={blurb.likeList.includes(auth.getProfile().data._id)}
            likes={blurb.likes}
          >
            {blurb.blurbText}
          </Fire>
        ))
      )}
    </div>
  );
}

export default Flame;
