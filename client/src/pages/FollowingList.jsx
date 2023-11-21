import React, { useState, useEffect } from "react";
import FollowingListCom from "../components/Follow/FollowingListCom";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWING } from "../utils/Queries/userQueries";
// import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";

function FollowingList() {
  const { userID } = useParams();
  console.log("User ID:", userID);
  const [following, setFollowing] = useState([]);

  const { loading, error, data } = useQuery(GET_FOLLOWING, {
    variables: {
      userId: userID,
    },
  });
  // console.log("Query User ID:", userId);
  // console.log("Loading:", loading);
  // console.log("Error:", error);
  // console.log("Data:", data);

  useEffect(() => {
    if (data && data.userFollowing) {
      console.log("Data:", data.userFollowing);
      setFollowing(data.userFollowing);
    }
  }, [data]);

  if (loading) {
    return <p>Loading following...</p>;
  }

  if (error) {
    console.error("Error fetching following data:", error);
    return <p>Error fetching following data</p>;
  }

  return (
    <div>
      <h1>Following Page</h1>
      {following.length > 0 ? (
        <ul>
          {following.map((following) => (
            <li key={following._id}>{following.username}</li>
          ))}
        </ul>
      ) : (
        <p>You don't follow anyone!</p>
      )}
    </div>
  );
}

export default FollowingList;
