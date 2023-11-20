import React from "react";

function FollowersListCom({ followersList, onClose }) {
  console.log("Followers List:", followersList);
  return (
    <div>
      <h2>Followers List</h2>
      <ul>
        {followersList?.map((follower) => (
          <li key={follower._id}>{follower.username}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default FollowersListCom;
