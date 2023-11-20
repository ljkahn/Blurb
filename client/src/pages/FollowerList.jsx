import React, { useState, useEffect } from "react";
import FollowersListCom from "../components/Follow/FollowersListCom";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../utils/Queries/userQueries";
import { useParams } from "react-router-dom";

function Followers() {
  console.log("Followers component rendered");
  const [followers, setFollowers] = useState([]);
  const { userId } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_FOLLOWERS, {
    variables: {
      userId: userId, // Use the userId from the route parameters
    },
  });

  // Use refetch to force a fresh fetch
  refetch();

  // useEffect(() => {
  //   if (data && data.userFollowers) {
  //     console.log("Data:", data.userFollowers);
  //     setFollowers(data.userFollowers);
  //   }
  // }, [data]);

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

  // return (
  //   <div>
  //     <h1>Followers Page</h1>
  //     {followers.length > 0 && (
  //       <FollowersListCom
  //         followersList={followers}
  //         onClose={() => setFollowers([])}
  //       />
  //     )}
  //   </div>
  // );

  return (
    <div>
      <h1>Followers Page</h1>
      {console.log("Followers:", followers)}
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
