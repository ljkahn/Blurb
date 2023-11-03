import React from 'react'
import '../style/Profile.css';
import '../index.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Photo from "../components/Profile/ProfilePhoto.jsx";
import Button from "@mui/material/Button";
import BlurbCard from '../components/Blurbs/BlurbCard.jsx';

import { useQuery } from '@apollo/client';
import { QUERY_ONE_USER } from '../utils/queries/userQueries';
import { useParams } from 'react-router-dom';


function UserProfile() {
  const {username} = useParams();
  const {data,  loading} = useQuery(QUERY_ONE_USER, {
    variables: {username: username},
  });
  
  const userData = data.user;
  // if (loading) {
  //   return <p>Loading...</p>
  // }

  if (error) {
    console.error(error)
  }

  if (!data || !data.user) {
    return <p>No data found for this user.</p>;
  }


  const neon = '#EDFB60';
  const white = '#f5f5f5';
  const lightGray = '#BEBFC5';
  const gray = '#808080';
  const darkGray = '#555555';
  const jetBlack = '#343434';
  const black = '#212121';

  const followStyle = {
    backgroundColor: neon,
    color: black,
    
  }
  const infoStyle = {
    backgroundColor: white,
    color: black,
   
  }
  return (
    <div>
      <Container id='userProfile'>
      <Photo profileImg={userData.profile.profilePic}/>
      <h1>{userData.profile.fullName}</h1>
      <h2>{userData.username}</h2>
      <p>{userData.profile.bio}</p>
      <p>📍{userData.profile.location}</p>
      <Grid>
        <Button id='btn' style={infoStyle} variant="contained"> {userData.followerNumber}Followers
        </Button>
        <Button id='btn' style={infoStyle} variant="contained">
          {userData.followingNumber}Following
        </Button>
      </Grid>

      <Button id='btn' style={followStyle} variant="contained">
        FOLLOW
      </Button>
      <BlurbCard/>
      </Container>
    </div>
  )
}

export default UserProfile