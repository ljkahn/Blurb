import React, { useState, useEffect } from "react";
import Photo from "../components/Profile/ProfilePhoto.jsx";
import Edit from "../components/Profile/Edit.jsx";
import AccountEdit from "../components/Profile/AccountEdit.jsx";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "../style/Profile.css";
import "../index.css";
import { REMOVE_Blurb } from "../utils/mutations/Blurb/BlurbMutations.js";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MY_PROFILE } from "../utils/Queries/userQueries.js";
import auth from "../utils/auth.js";
import BlurbStream from "../components/Blurbs/BlurbCard.jsx";
import BlurbCom from "../components/Blurbs/BlurbComCard.jsx";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import FollowersList from "../components/Follow/FollowersListCom.jsx";
import FollowingListCom from "../components/Follow/FollowingListCom.jsx";

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      // ... (your theme overrides)
    },
  });

function UserProfile({ registered }) {
  const outerTheme = useTheme();
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [accountSettingsVisible, setAccountSettingsVisible] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("profile");
  const [userData, setUserData] = useState(null);
  const { loading, data, refetch } = useQuery(QUERY_MY_PROFILE);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (registered) {
      // refetch();
    }
    if (!loading) {
      // console.log(data.me);
      setUserData(data.me);
      // refetch();
    }
  }, [data]);

  const handleEditClick = () => {
    setIsEditVisible(true);
    setShowProfile(false);
    setAccountSettingsVisible(false);
    setCurrentComponent("edit");
    refetch();
  };

  const showAccountSettings = () => {
    setShowProfile(false);
    setIsEditVisible(false);
    setAccountSettingsVisible(true);
    setCurrentComponent("accountSettings");
    refetch();
  };

  const handleGoBack = () => {
    if (currentComponent === "edit" || currentComponent === "accountSettings") {
      setIsEditVisible(false);
      setAccountSettingsVisible(false);
      setShowProfile(true);
      setCurrentComponent("profile");
      refetch();
    }
  };

  const neon = "#F7E258";
  const white = "#F5F5F5";
  const black = "#212121";
  const buttonStyle = {
    backgroundColor: neon,
    color: black,
  };

  const editStyle = {
    backgroundColor: white,
    color: black,
  };

  const [removeBlurb] = useMutation(REMOVE_Blurb, {
    refetchQueries: [QUERY_MY_PROFILE],
  });

  useEffect(() => {
    if (data && data.me) {
      setUserData(data.me);
    }
  }, [data]);

  console.log(userData);

  const handleBlurbDelete = async (deletedBlurbId) => {
    try {
      await removeBlurb({ variables: { blurbId: deletedBlurbId } });
      setUserData((prevUserData) => ({
        ...prevUserData,
        blurbs: prevUserData.blurbs.filter(
          (blurb) => blurb._id !== deletedBlurbId
        ),
      }));
    } catch (err) {
      console.log("blurb not found");
    }
  };

  const showFollowers = () => {
    // Instead of using async/await here, you can directly set the state
    fetchFollowersData().then((followersData) => {
      setFollowers(followersData);
      setCurrentComponent("followers");
    });
  };

  const showFollowing = async () => {
    // Fetch following data (you may need to implement this)
    const followingData = await fetchFollowingData();
    setFollowing(followingData);
    setCurrentComponent("following");
  };

  return (
    <div>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <IconButton onClick={handleGoBack}>
          <ArrowBackIosIcon />
        </IconButton>
        {userData &&
          (showProfile ? (
            <Container id="profile">
              <Photo profileImg={userData.profile.profilePic} />
              <h1>{userData.profile.fullName}</h1>
              <h2>{userData.username}</h2>
              <p id="info">{userData.profile.bio}</p>
              <p id="info">📍{userData.profile.location}</p>
              <Grid>
                <Button
                  id="btn"
                  style={buttonStyle}
                  variant="contained"
                  component={Link}
                  to="/followers"
                >
                  {userData.followerNumber} Followers
                </Button>
                <Button
                  id="btn"
                  style={buttonStyle}
                  variant="contained"
                  onClick={showFollowing}
                >
                  {userData.followingNumber} Following
                </Button>
              </Grid>
              <Button
                id="btn"
                style={editStyle}
                variant="contained"
                onClick={handleEditClick}
              >
                Edit Profile{" "}
              </Button>
              {userData.blurbs &&
                userData.blurbs.map((blurb) => (
                  <div key={blurb._id}>
                    <BlurbStream
                      key={blurb._id}
                      // propRefetch={refetch}
                      blurbId={blurb._id}
                      username={blurb.username}
                      profilePic={userData.profile.profilePic}
                      onDelete={() => handleBlurbDelete(blurb._id)}
                      showEdit={true}
                      liked={blurb.likeList.includes(
                        auth.getProfile().data._id
                      )}
                      likes={blurb.likes}
                      // isLiked={refetch}
                    >
                      {blurb.blurbText}
                      <div>{blurb.tags}</div>
                    </BlurbStream>
                    {blurb.comments.map((comment) => (
                      <BlurbCom
                        key={comment._id}
                        commentId={comment._id}
                        commentTest={comment}
                        blurbId={blurb._id}
                        username={comment?.commentAuthor?.username}
                        comments={comment.commentText}
                        liked={comment.likeList.includes(
                          auth.getProfile().data._id
                        )}
                        likes={comment.likes}
                      />
                    ))}
                  </div>
                ))}
            </Container>
          ) : isEditVisible ? (
            <Edit
              userData={userData}
              showAccountSettings={showAccountSettings}
            />
          ) : (
            accountSettingsVisible && <AccountEdit userData={userData} />
          ))}
        {followers.length > 0 && currentComponent === "followers" && (
          <FollowersList
            followers={followers}
            onClose={() => setFollowers([])}
          />
        )}
        {following.length > 0 && currentComponent === "following" && (
          <FollowingListCom
            following={following}
            onClose={() => setFollowing([])}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

export default UserProfile;
