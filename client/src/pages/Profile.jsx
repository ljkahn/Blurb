import React, { useState, useEffect } from 'react';
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
import BlurbCard from "../components/Blurbs/BlurbCard.jsx";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_MY_PROFILE } from "../utils/queries/userQueries.js";
import Auth from "../utils/auth.js";


function Profile() {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [accountSettingsVisible, setAccountSettingsVisible] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("profile");
  const [userData, setUserData] = useState(null); 
  const { loading, data } = useQuery(QUERY_MY_PROFILE);

  useEffect (() => {
    if (!loading) {
      console.log( data.me);
      setUserData({username: data.me.username, ...data.me.profile})
    }

  }, [loading]);

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

  const neon = "#EDFB60";
  const white = "#f5f5f5";
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


  return (
    <div>
      <IconButton onClick={handleGoBack}>
        <ArrowBackIosIcon />
      </IconButton>
      {userData && (showProfile ? (
        <Container id="profile">
          <Photo profileImg={userData.profilePic} />
      <h1>{ userData.fullName}</h1>
      <h2>{userData.username}</h2>
          <p id="info">{userData.bio}</p>
          <p id="info">📍{userData.location}</p>
          <Grid>
            <Button id="btn" style={buttonStyle} variant="contained">
              {userData.followerNumber || 0} Followers
            </Button>
            <Button id="btn" style={buttonStyle} variant="contained">
              {userData.followingNumber || 0} Following
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

          {userData.blurbs && userData.blurbs.map((blurb, index) => (
            <BlurbCard key={index} blurbData={blurb} />
          ))}
        </Container>
      ) : isEditVisible ? (
        <Edit showAccountSettings={showAccountSettings} />
      ) : (
        accountSettingsVisible && <AccountEdit />
      ))}
    </div>
  )
}

export default Profile