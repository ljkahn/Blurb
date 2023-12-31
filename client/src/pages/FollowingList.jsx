import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FollowingListCom from "../components/Follow/FollowingListCom";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWING } from "../utils/Queries/userQueries";
// import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../style/Profile.css";

function FollowingList() {
  const { userID } = useParams();

  const [following, setFollowing] = useState([]);
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

  const { loading, error, data } = useQuery(GET_FOLLOWING, {
    variables: {
      userId: userID,
    },
  });

  useEffect(() => {
    if (data && data.userFollowing) {
      setFollowing(data.userFollowing);
    }
  }, [data]);

  if (loading) {
    return <p>Loading following...</p>;
  }

  if (error) {
    console.error("Error fetching following data:", error);
    return <p>Error fetching following data</p>;
  }

  return (
    <div id="followingContain">
      <div>
        {following.length > 0 ? (
          following.map((following) => (
            <Card className="followCard" key={following._id}>
              <CardContent className="followCardContent">
                <div className="followUserInfo">
                  <h3>{following.username}</h3>
                  <p>{following.profile.fullName}</p>
                </div>
              </CardContent>
              <div className="imgContain">
                <Link to={`/profile/${following.username}`}>
                  <Avatar
                    id="notifyPP"
                    className="Blfriend"
                    alt={following.username}
                    src={
                      following.profile.profilePic
                        ? `https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${following.profile.profilePic}.png`
                        : staticImg
                    }
                    sx={{ width: 80, height: 80 }}
                  />
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <p>
            You aren't following anyone! Check out the global stream or the
            flame page to make new friends!
          </p>
        )}
      </div>
    </div>
  );
}

export default FollowingList;
