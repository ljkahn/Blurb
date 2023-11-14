import React from "react";

function FollowingListCom({ followingList }) {
  return (
    <div>
      <h2>Following List</h2>
      <ul>
        {followingList.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default FollowingListCom;
