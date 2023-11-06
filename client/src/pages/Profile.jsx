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
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MY_PROFILE } from "../utils/Queries/userQueries.js";
import Auth from "../utils/auth.js";
import BlurbStream from '../components/Blurbs/BlurbCard.jsx';
import BlurbCom from "../components/Blurbs/BlurbComCard.jsx";


function Profile({ registered }) {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [accountSettingsVisible, setAccountSettingsVisible] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { loading, data, refetch } = useQuery(QUERY_MY_PROFILE);
      
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

  useEffect (() => {
    if (registered) {
      refetch();
    }
    if (!loading) {
      console.log(data.me);
      setUserData(data.me)
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

  const handleEditClick = () => {
    setIsEditVisible(true);
    setShowProfile(false);
    setAccountSettingsVisible(false);
    setCurrentComponent("edit");
  };

  const showAccountSettings = () => {
    setShowProfile(false);
    setIsEditVisible(false);
    setAccountSettingsVisible(true);
    setCurrentComponent("accountSettings");
  };

  const handleGoBack = () => {
    if (currentComponent === "edit" || currentComponent === "accountSettings") {
      setIsEditVisible(false);
      setAccountSettingsVisible(false);
      setShowProfile(true);
      setCurrentComponent("profile");
    }
  };

  const neon = "#F7E258";
  const white = "#F5F5F5";
  const lightGray = "#BEBFC5";
  const gray = "#808080";
  const darkGray = "#555555";
  const jetBlack = "#343434";
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
              <Button id="btn" style={buttonStyle} variant="contained">
                {userData.followerNumber} Followers
              </Button>
              <Button id="btn" style={buttonStyle} variant="contained">
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
                    // key={blurb._id}
                    blurbId={blurb._id}
                    username={blurb.username}
                    profilePic={userData.profile.profilePic}
                    onDelete={() => handleBlurbDelete(blurb._id)}
                    showEdit={true}
                  >
                    {blurb.blurbText}
                  </BlurbStream>
                  {blurb.comments.map((comment) => (
                    <BlurbCom
                      // key={comment._id}
                      blurbId={blurb._id}
                      // username={comment.commentAuthor.username}
                      comments={comment.commentText}
                    />
                  ))}
                </div>
              ))}
          </Container>
        ) : isEditVisible ? (
          <Edit userData={userData} showAccountSettings={showAccountSettings} />
        ) : (
          accountSettingsVisible && <AccountEdit userData={userData} />
        ))}
    </div>
  );
}
export default Profile;
