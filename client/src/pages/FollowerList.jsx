import React, { useState, useEffect } from "react";
import FollowersList from "../components/Follow/FollowersList";
import { fetchFollowersData } from "../utils/api"; // Update with your actual API file

function Followers() {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFollowersData(); // Replace with your API call
        setFollowers(response);
      } catch (error) {
        console.error("Error fetching followers data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Followers Page</h1>
      {followers.length > 0 && (
        <FollowersList
          followersList={followers}
          onClose={() => setFollowers([])}
        />
      )}
    </div>
  );
}

export default Followers;
