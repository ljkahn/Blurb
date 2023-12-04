import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_FOLLOWERS } from "../utils/Queries/userQueries";
import FollowersListCom from "../components/Follow/FollowersListCom";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../style/Profile.css"


function Followers(onClose) {
  const { userID } = useParams();
  console.log("User ID:", userID);
  const [followers, setFollowers] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const sample = "cld-sample-5";
  const cloudName = "dmnfg3ids";
  const [staticImg, setStaticPic] = useState(
    `https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${sample}.png`
  );

  useEffect(() => {
    if (profilePic) {
      setStaticPic(
        `https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${profilePic}.png`
      );
    }
  }, [profilePic]);


  const { loading, error, data } = useQuery(GET_FOLLOWERS, {
    variables: {
      userId: userID,
    },
  });
  // console.log("Query User ID:", userId);
  // console.log("Loading:", loading);
  // console.log("Error:", error);
  // console.log("Data:", data);

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
  console.log(followers);



  return (
    <div id="followerContain">
      {/* <h1>Followers Page</h1> */}
      <div>
      {followers.length > 0 ? (
          followers.map((follower) => (
            <Card className="followCard" key={follower._id}>
            <CardContent className="followCardContent">
              <div className="followUserInfo">
            <h3>{follower.username}</h3>
            <p>{follower.profile.fullName}</p>
            </div>
            </CardContent>
            <div className="imgContain">
              <Link to={`/profile/${follower.username}`}>
            <Avatar
            id="notifyPP"
            className="Blfriend"
            alt={follower.username}
            src={
              follower.profile.profilePic
                ? `https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${follower.profile.profilePic}.png`
                : staticImg
            }
            sx={{ width: 80, height: 80 }}
            />
            </Link>
            </div>
            </Card>
          ))
          
          ) : (
            <p>No followers yet... You can change that! 😃</p>
            )}
            
      </div>
      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
}

export default Followers;

{/* <CardMedia id="followImg" component="img" image={staticImg} alt={follower.profile.fullName} /> */}