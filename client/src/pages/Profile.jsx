import React, { useState, useEffect } from "react";
import "../style/Profile.css";
import "../index.css";
import { useNavigate, useParams, Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_Blurb } from "../utils/mutations/Blurb/BlurbMutations.js";
import { QUERY_MY_PROFILE } from "../utils/Queries/userQueries.js";
import { GET_FOLLOWERS, GET_FOLLOWING } from "../utils/Queries/userQueries";
import { ALL_BLURBS } from "../utils/Queries/queries.js";

import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Photo from "../components/Profile/ProfilePhoto.jsx";
import Edit from "../components/Profile/Edit.jsx";
import AccountEdit from "../components/Profile/AccountEdit.jsx";
import auth from "../utils/auth.js";
import BlurbStream from "../components/Blurbs/BlurbCard.jsx";
import BlurbCom from "../components/Blurbs/BlurbComCard.jsx";
import FollowersList from "../components/Follow/FollowersListCom.jsx";
import FollowingListCom from "../components/Follow/FollowingListCom.jsx";

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#f7e258",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
            "& .MuiInputBase-input": {
              color: "#F3F3F3",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
            "& .MuiInputBase-input": {
              color: "#F3F3F3",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
            "& .MuiInputBase-input": {
              color: "#F3F3F3",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
            "& .MuiInputBase-input": {
              color: "#F3F3F3",
            },
          },
        },
      },
    },
  });

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
function Profile({ registered }) {
  const outerTheme = useTheme();
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [accountSettingsVisible, setAccountSettingsVisible] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { loading, data, refetch } = useQuery(QUERY_MY_PROFILE);
  const [followers, setFollowers] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const navigate = useNavigate();

  // useEffect (() => {
  //   const { loading, data } = useQuery(QUERY_MY_PROFILE);

  //   if (!isLoading) {
  //     console.log(data.me);
  //     setUserData(data.me)
  //   }
  //   else {
  //     setLoading(loading);
  //   }
  // }, [isLoading]);

  //Gain data for loggedIn user's following
  const fetchFollowersData = async (userId) => {
    try {
      const { data } = await client.query({
        query: GET_FOLLOWERS,
        variables: { userId },
      });
      return data.userFollowers;
    } catch (error) {
      console.error("Error fetching followers:", error);
      return [];
    }
  };
  //Gain data for loggedIn user's followers
  const fetchFollowingData = async (userId) => {
    try {
      const { data } = await client.query({
        query: GET_FOLLOWING,
        variables: { userId },
      });
      return data.user.Following;
    } catch (error) {
      console.error("Error fetching following:", error);
      return [];
    }
  };
  //Show page of loggedIn user's followers
  const showFollowers = () => {
    // Instead of using async/await here, you can directly set the state
    fetchFollowersData().then((followersData) => {
      setFollowers(followersData);
      setCurrentComponent("followers");
    });
  };
  //Show page of loggedIn user's following
  const showFollowing = async () => {
    // Fetch following data (you may need to implement this)
    const followingData = await fetchFollowingData();
    setFollowingList(followingData);
    setCurrentComponent("following");
  };
  //Validate that loggedIn user is registered to show valid user components and render logout and nav bar correctly
  useEffect(() => {
    if (registered) {
      // refetch();
    }
    if (!loading) {
      // console.log(data.me);
      setUserData(data.me);
      // refetch();
    }
  }, [loading, registered]);

  //   useEffect(() => {
  //   if (data && data.me) {
  //     // Assuming data.me.blurbs is the array that needs to be sorted
  //     const sortedBlurbs = data.me.blurbs.slice().sort((a, b) => {
  //       const dateA = new Date(a.createdAt);
  //       const dateB = new Date(b.createdAt);
  //       return dateB - dateA; // This will sort blurbs in descending order
  //     });

  //     // Set the user data with the sorted blurbs array
  //     setUserData({
  //       ...data.me,
  //       blurbs: sortedBlurbs,
  //     });
  //   }
  // }, [data]);

  //Hide the profile component and show Edit.jsx to user can update personal information
  const handleEditClick = () => {
    setIsEditVisible(true);
    setShowProfile(false);
    setAccountSettingsVisible(false);
    setCurrentComponent("edit");
    refetch();
  };

  //Hide the profile componenet, keep Edit.jsx hidden and show AccountEdit.jsx so the user can edit their email, password, or delete their account
  const showAccountSettings = () => {
    setShowProfile(false);
    setIsEditVisible(false);
    setAccountSettingsVisible(true);
    setCurrentComponent("accountSettings");
    refetch();
  };

  //Use the back arrow to navigate back to the base Profile.jsx from Edit.jsx or AccountEdit.jsx if user chooses not to edit profile or account
  const handleGoBack = () => {
    if (currentComponent === "edit" || currentComponent === "accountSettings") {
      setIsEditVisible(false);
      setAccountSettingsVisible(false);
      setShowProfile(true);
      setCurrentComponent("profile");
      refetch();
    }
  };

  //LoggedIn user may delete prior blurbs they have created
  const [removeBlurb] = useMutation(REMOVE_Blurb, {
    refetchQueries: [QUERY_MY_PROFILE],
  });

  useEffect(() => {
    if (data && data.me) {
      setUserData(data.me);
    }
  }, [data]);

  // console.log(userData);

  //LoggedIn user may delete prior blurb they have created using remove_blurb mutation by filtering through the user's blurbs, removing the selected blurb by ID and returning the new blurb array to be displayed on the profile and corresponding home page streams
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

  return (
    <div>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <IconButton onClick={handleGoBack}>
          <ArrowBackIosIcon id="back" />
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
                  onClick={() => navigate(`/followers/${userData._id}`)}
                >
                  {userData.followerNumber} Followers
                </Button>
                <Button
                  id="btn"
                  style={buttonStyle}
                  variant="contained"
                  onClick={() => navigate(`/following/${userData._id}`)}
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
      </ThemeProvider>
    </div>
  );
}
export default Profile;
