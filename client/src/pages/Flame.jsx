import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Fire from "../components/Blurbs/FireCard";
import BlurbCard from "../components/Blurbs/BlurbCard.jsx";
// import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@apollo/client";
import { ALL_BLURBS } from "../utils/Queries/queries.js";

function Flame() {
  const [blurbs, setBlurbs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { loading, data } = useQuery(ALL_BLURBS);
  useEffect(() => {
    if (!loading) {
      const allBlurbs = [...data.blurbs];

      // Filter Blurbs with more than 10 likes
      const popularBlurbs = allBlurbs.filter((blurb) => blurb.likes > 10);

      // Sort filtered Blurbs in descending order by the number of likes
      popularBlurbs.sort((a, b) => b.likes - a.likes);

      setBlurbs(popularBlurbs);
      setLoading(false);
    }
  }, [loading]);
  return (
    <div>
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
        blurbs.map((blurb, i) => (
          <Fire
            key={i}
            blurbId={blurb._id}
            username={blurb.blurbAuthor.username}
          >
            {blurb.blurbText}
          </Fire>
        ))
      )}
    </div>
  );
}

export default Flame;
