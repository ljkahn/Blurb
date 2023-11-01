import React from 'react'
import Nav from "../components/NavBar.jsx";
import Photo from "../components/Profile/ProfilePhoto.jsx";
import Edit from "../components/Profile/Edit.jsx";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import '../style/Profile.css';
import '../index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';



function Profile() {

  //use auth to create ternary statement for 
  //1. whether or not edit profile button shows up
  //2. what user name to pop up 

  //Use query to display blubrs attatched to one user
  const neon = '#EDFB60';
  const white = '#f5f5f5';
  const lightGray = '#BEBFC5';
  const gray = '#808080';
  const darkGray = '#555555';
  const jetBlack = '#343434';
  const black = '#212121';

  const buttonStyle = {
    backgroundColor: neon,
    color: black,
  }
  const editStyle = {
    backgroundColor: white,
    color: black
  }

  return (
    <div >
      
      <Container id='profile'>
      <Photo/>
      <h1>Lillian Edwards</h1>
      <h2>lillianedwards</h2>
      <Grid  >
    
      <Button id='btn' style={buttonStyle} variant="contained">103 Followers</Button>
      <Button id='btn' style={buttonStyle} variant="contained">95 Following</Button>
      </Grid>
      
      <Button id='btn' style={editStyle} variant="contained">Edit Profile </Button>
      
      <h3>USER BLURBS - component all the way down</h3>
      <Nav/>
     
      </Container>
     
      
    </div>
  )
}

export default Profile