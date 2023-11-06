import Nav from "../components/NavBar.jsx";
import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Fire from "../components/Blurbs/FireCard";
import BlurbCard from "../components/Blurbs/BlurbCard.jsx";
// import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@apollo/client";
import { ALL_BLURBS } from "../utils/Queries/queries.js";

function Home() {
  const [blurbs, setBlurbs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { loading, data } = useQuery(ALL_BLURBS);

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
      console.log(data.blurbs);
      setLoading(false);
    }
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
        blurbs.map((blurb, i) => (
          <BlurbCard
            key={i}
            blurbId={blurb._id}
            username={blurb.blurbAuthor.username}
          >
            {blurb.blurbText}
          </BlurbCard>
        ))
      )}
    </div>
  );
}

export default Home;
