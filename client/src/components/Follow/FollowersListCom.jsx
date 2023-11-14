import React from "react";

function FollowersList({ followersList, onClose }) {
  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followersList.map((follower) => (
          <li key={follower._id}>{follower.username}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close Followers</button>
    </div>
  );
}

export default FollowersList;
