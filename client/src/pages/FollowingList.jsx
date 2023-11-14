// FollowingList.jsx
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_FOLLOWING_LIST } from "../utils/Queries/userQueries";
import FollowingListCom from "../components/Follow/FollowingListCom";

function FollowingList() {
  const [followingList, setFollowingList] = useState([]);
  const { loading, data } = useQuery(QUERY_FOLLOWING_LIST);

  useEffect(() => {
    if (!loading && data && data.followingList) {
      setFollowingList(data.followingList);
    }
  }, [loading, data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <FollowingListCom followingList={followingList} />;
}

export default FollowingList;
