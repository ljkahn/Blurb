import React from "react";

const FollowersList = ({ followers, onClose }) => {
  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower._id}>{follower.username}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FollowersList;
