import React, { useState, useEffect } from "react";
import "../style/Profile.css";
import "../index.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Photo from "../components/Profile/ProfilePhoto.jsx";
import Button from "@mui/material/Button";
import BlurbStream from "../components/Blurbs/BlurbCard.jsx";
import BlurbCom from "../components/Blurbs/BlurbComCard.jsx";
import { useQuery, useMutation } from "@apollo/client";
import { USER_BLURBS } from "../utils/Queries/queries.js";
import { QUERY_MY_PROFILE, QUERY_ONE_USER } from "../utils/Queries/userQueries";
import { GET_FOLLOWERS, GET_FOLLOWING } from "../utils/Queries/userQueries";
import { FOLLOW_USER, UNFOLLOW_USER } from "../utils/mutations/userMutations";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Auth from "../utils/auth.js";
import FollowersList from "../components/Follow/FollowersListCom.jsx";
import FollowingListCom from "../components/Follow/FollowingListCom.jsx";

function UserProfile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [blurbs, setBlurbs] = useState([]);
  const [following, setFollowing] = useState(true);
  const { data, loading, error, refetch } = useQuery(QUERY_ONE_USER, {
    variables: { username: username },
    fetchPolicy: "cache-and-network",
  });
  const { isLoading, blurbData } = useQuery(USER_BLURBS);

  const [followUser] = useMutation(FOLLOW_USER, {
      refetchQueries: [QUERY_MY_PROFILE],
      awaitRefetchQueries: true,
    });

  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    refetchQueries: [QUERY_MY_PROFILE],
    awaitRefetchQueries: true,
  });

  console.log(userData);

  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(""); // Add state for current component

  const neon = "#F7E258";
  const white = "#f5f5f5";
  const lightGray = "#BEBFC5";
  const gray = "#808080";
  const darkGray = "#555555";
  const jetBlack = "#343434";
  const black = "#212121";

  const followStyle = {
    backgroundColor: neon,
    color: black,
    borderRadius: 10,
  };

  const infoStyle = {
    backgroundColor: white,
    color: black,
  };

  // const fetchFollowersData = async (userId) => {
  //   try {
  //     const { data } = await client.query({
  //       query: GET_FOLLOWERS,
  //       variables: { userId },
  //     });
  //     return data.userFollowers;
  //   } catch (error) {
  //     console.error("Error fetching followers:", error);
  //     return [];
  //   }
  // };

  // const fetchFollowingData = async (userId) => {
  //   try {
  //     const { data } = await client.query({
  //       query: GET_FOLLOWING,
  //       variables: { userId },
  //     });
  //     return data.userFollowing;
  //   } catch (error) {
  //     console.error("Error fetching following:", error);
  //     return [];
  //   }
  // };

  useEffect(() => {
    if (!loading && data && data.user) {
      const currentUser = Auth.getProfile();
      const idArray = data.user.followers.map((obj) => obj._id);
      //currentUser.data._id
      setFollowing(idArray.includes(currentUser.data._id) ? true : false);
      setUserData(data.user);
    }
  }, [loading, data]);

  if (error) {
    console.log(JSON.stringify(error));
  }

  const handleFollowUser = (userIdToFollow) => {
    followUser({
      variables: {
        userIdToFollow: userIdToFollow,
      },
    })
      .then((result) => {
        refetch();
        console.log('User followed successfully!');
        //Show a success message
      })
      .catch((error) => {
        console.error("Failed to follow user:", error);
      });
  };

  const handleUnfollowUser = (userIdToUnfollow) => {
    unfollowUser({
      variables: {
        userIdToUnfollow: userIdToUnfollow,
      },
    })
      .then((result) => {
        console.log("User unfollowed successfully!");
        refetch();
      })
      .catch((error) => {
        console.error("Failed to unfollow user:", error);
      });
  };

  console.log(blurbData);

  useEffect(() => {
    if (!isLoading && blurbData) {
      const allBlurbs = [...blurbData.blurbs,];
      const newBlurbs = allBlurbs.slice(); // Create a shallow copy to avoid mutating the original array
      newBlurbs.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
      setBlurbs([...blurbData.blurbs]);
      // setLoading(false);
      // refetch();
    }
  }, [isLoading, blurbData]);

  if (error) {
    return <div>Error loading data!</div>
  }


  // const showFollowers = () => {
  //   // Instead of using async/await here, you can directly set the state
  //   fetchFollowersData(userData._id).then((followersData) => {
  //     setFollowers(followersData);
  //     setCurrentComponent("followers");
  //   });
  // };

  // const showFollowing = () => {
  //   // Instead of using async/await here, you can directly set the state
  //   fetchFollowingData(userData._id).then((followingData) => {
  //     setFollowers(followingData);
  //     setCurrentComponent("following");
  //   });
  // };

  return (
    <div>
      {userData && userData.profile && (
        <Container id="userProfile">
          <Photo profileImg={userData.profile.profilePic} />
          <h1>{userData.profile.fullName}</h1>
          <h2>{userData.username}</h2>
          <p>{userData.profile.bio}</p>
          <p>📍{userData.profile.location}</p>
          <Grid>
            <Button
              id="btn"
              style={infoStyle}
              variant="contained"
              onClick={() => navigate(`/followers/${userData._id}`)}
            >
              {userData.followerNumber} Followers
            </Button>
            <Button
              id="btn"
              style={infoStyle}
              variant="contained"
              onClick={() => navigate(`/following/${userData._id}`)}
            >
              {userData.followingNumber} Following
            </Button>
          </Grid>

          {following ? (
            <Button
              id="btn"
              style={followStyle}
              variant="contained"
              onClick={() => handleUnfollowUser(userData._id)}
            >
              UNFOLLOW
            </Button>
          ) : (
            <Button
              id="btn"
              style={followStyle}
              variant="contained"
              onClick={() => handleFollowUser(userData._id)}
            >
              FOLLOW
            </Button>
          )}
        {userData.blurbs &&
          userData.blurbs.map((blurb, blurbIndex) => (
            <div key={blurbIndex}>
              <BlurbStream
                key={blurb._id}
                // propRefetch={refetch}
                blurbId={blurb._id}
                username={username}
                profilePic={userData.profile.profilePic}
                onDelete={() => handleBlurbDelete(blurb._id)}
                showEdit={false}
                liked={blurb.likeList.includes(
                  Auth.getProfile().data._id
                )}
                likes={blurb.likes}
                // isLiked={refetch}
              >
                {blurb.blurbText}
                <div id={blurbIndex} className="tags">
                  {blurb?.tags?.map((tags, tagIndex) => (
                    <div key={tagIndex} className="tag">#{tags}</div>
                  ))}
                </div>
              </BlurbStream>
              {blurb?.comments?.map((comment) => (
                <BlurbCom
                  key={comment._id}
                  commentId={comment._id}
                  commentTest={comment}
                  blurbId={blurb._id}
                  username={comment?.commentAuthor?.username}
                  comments={comment.commentText}
                  liked={comment.likeList.includes(
                    Auth.getProfile().data._id
                  )}
                  likes={comment.likes}
                />
              ))}
            </div>
          ))}
        </Container>
      )}
    </div>
  );
}

export default UserProfile;
