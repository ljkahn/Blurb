import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function FollowersListCom({ followersList, onClose }) {
  console.log("Followers List:", followersList);
  return (
    <div>
      <h2>Followers List</h2>
      <div>
        {followersList?.map((follower) => (
          <Card key={follower._id}>
            {follower.username}
          </Card>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default FollowersListCom;
