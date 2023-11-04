import React, { useState, useEffect } from 'react'
import '../style/Profile.css';
import '../index.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Photo from "../components/Profile/ProfilePhoto.jsx";
import Button from "@mui/material/Button";
import BlurbStream from '../components/Blurbs/BlurbCard.jsx';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ONE_USER } from '../utils/Queries/userQueries';
import {FOLLOW_USER, UNFOLLOW_USER} from '../utils/mutations/userMutations';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const {username} = useParams();
  const [userData, setUserData] = useState(null);
  const {data,  loading, error} = useQuery(QUERY_ONE_USER, {
    variables: {username: username},
  });
  const [followUser, {loading: followLoading, error: followError}] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);
  const navigation = useNavigate();

  console.log(data);
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
useEffect(() => {
  if (!loading && data && data.user) {
    setUserData(data.user);
  }
}, [loading,data]);

if (error) {
  console.log(JSON.stringify(error))
}

const handleFollowUser = (userIdToFollow) => {
  followUser({
    variables: {
      userIdToFollow: userIdToFollow,
    }
  })
  .then((result) => {
    console.log('User followed successfully!');
    //Show a success message 
  })
  .catch ((error) => {
    console.error('Failed to follow user:', error)
  });
};

const isCurrentUserFollowing = userData?.followers?.includes(Auth.loggedIn(navigation)._id);


const handleUnfollowUser = (userIdToUnfollow) => {
  unfollowUser({
    variables: {
      userIdToUnfollow: userIdToUnfollow,
    }
  })
  .then((result) => {
    console.log('User unfollowed successfully!');
  })
  .catch((error) => {
    console.error('Failed to unfollow user:', error)
  });
};

const handleFollowButton = isCurrentUserFollowing ? (
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
);


  return (
    <div>
      {userData && userData.profile && (
      <Container id='userProfile'>
      <Photo profileImg={userData.profile.profilePic}/>
      <h1>{userData.profile.fullName}</h1>
      <h2>{userData.username}</h2>
      <p>{userData.profile.bio}</p>
      <p>📍{userData.profile.location}</p>
      <Grid>
        <Button id='btn' style={infoStyle} variant="contained"> {userData.followerNumber} Followers
        </Button>
        <Button id='btn' style={infoStyle} variant="contained">
          {userData.followingNumber} Following
        </Button>
      </Grid>

      {handleFollowButton}
      {userData.blurbs.map((blurb, index) => (
            <BlurbStream key={index} blurbId={blurb.blurbId} username = {blurb.username} >
              {blurb.blurbText}
            </BlurbStream>
      ))}
      </Container>
      )}
    </div>
  )
}

export default UserProfile