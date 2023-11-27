import React, { useState, useEffect } from "react";
import FollowersListCom from "../components/Follow/FollowersListCom";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../utils/Queries/userQueries";
// import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";

function Followers() {
  const { userID } = useParams();
  console.log("User ID:", userID);
  const [followers, setFollowers] = useState([]);

  const { loading, error, data } = useQuery(GET_FOLLOWERS, {
    variables: {
      userId: userID,
    },
  });
  // console.log("Query User ID:", userId);
  // console.log("Loading:", loading);
  // console.log("Error:", error);
  // console.log("Data:", data);

  useEffect(() => {
    if (data && data.userFollowers) {
      console.log("Data:", data.userFollowers);
      setFollowers(data.userFollowers);
    }
  }, [data]);

  if (loading) {
    return <p>Loading followers...</p>;
  }

  if (error) {
    console.error("Error fetching followers data:", error);
    return <p>Error fetching followers data</p>;
  }

  return (
    <div id="followerContain">
      <h1>Followers Page</h1>
      {followers.length > 0 ? (
        <ul>
          {followers.map((follower) => (
            <li key={follower._id}>{follower.username}</li>
          ))}
        </ul>
      ) : (
        <p>No followers to display.</p>
      )}
    </div>
  );
}

export default Followers;
