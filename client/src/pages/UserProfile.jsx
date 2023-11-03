import React from 'react'
import '../style/Profile.css';
import '../index.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Photo from "../components/Profile/ProfilePhoto.jsx";
import Button from "@mui/material/Button";
import BlurbCard from '../components/Blurbs/BlurbCard.jsx';


function UserProfile() {
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
      <Photo/>
      <h1>NAME</h1>
      <h2>USERNAME</h2>
      <p>BIO</p>
      <p>LOCATION</p>
      <Grid>
        <Button id='btn' style={infoStyle} variant="contained">FOLLOWERS
        </Button>
        <Button id='btn' style={infoStyle} variant="contained">
          FOLLOWING
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