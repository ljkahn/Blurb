import React, { useState, useEffect } from "react";
import FollowersListCom from "../components/Follow/FollowersListCom";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../utils/Queries/queries";

function Followers() {
  const { loading, error, data } = useQuery(GET_FOLLOWERS);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (data) {
      setFollowers(data.followers);
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
    <div>
      <h1>Followers Page</h1>
      {followers.length > 0 && (
        <FollowersListCom
          followersList={followers}
          onClose={() => setFollowers([])}
        />
      )}
    </div>
  );
}

export default Followers;
