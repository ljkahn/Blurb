import Notify from "../components/Notify/Notify";
import Nav from "../components/NavBar.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@apollo/client";
import { ALL_BLURBS } from "../utils/Queries/queries.js";
import auth from "../utils/auth.js";
import { QUERY_GET_NOTIFICATIONS } from "../utils/Queries/userQueries.js";

function Likes() {
  const { loading, error, data } = useQuery(QUERY_GET_NOTIFICATIONS);
  const [isLoading, setLoading] = useState(true);
  const [notifyData, setNotifyData] = useState([]);

  // console.log("Yooo Yoo", data.notify.notifications);

  const navigate = useNavigate();

  // Navigate to login page after token expires
  useEffect(() => {
    if (!auth.loggedIn(navigate)) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (!loading && data) {
      setNotifyData([...data.notify.notifications]);
      setLoading(false);
      // refetch();
    }
  }, [loading, data]);

  if (error) {
    return <div>Error loading data!</div>;
  }

  // console.log("likes page", notifyData);

  return (
    <div>
      {isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#F7E258"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        notifyData.map((data) => (
          <div key={data._id}>
            <Notify
              notificationId={data._id}
              blurbId={data._id}
              username={data.sender.username}
              profilePic={data.sender.profile.profilePic}
              type={data.type}
            ></Notify>
          </div>
        ))
      )}
    </div>
  );
}

export default Likes;
