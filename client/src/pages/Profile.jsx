import React from 'react'
import Nav from "../components/NavBar.jsx";
import Photo from "../components/Profile/ProfilePhoto.jsx";
import Edit from "../components/Profile/Edit.jsx";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import '../style/Profile.css';
import '../index.css';


function Profile() {

  //use auth to create ternary statement for 
  //1. whether or not edit profile button shows up
  //2. what user name to pop up 

  //Use query to display blubrs attatched to one user
  return (
    <div >
      <Container id='profile'>
      <Photo/>
      <h1>Lillian Edwards</h1>
      <h2>lillianedwards</h2>
      <Grid>
      <Button  style={{background: "EDFB60"}} variant="contained">103 Followers</Button>
      <Button variant="contained">95 Following</Button>
      </Grid>
      <Button variant="contained">Edit Profile </Button>
      <h3>USER BLURBS - component all the way down</h3>
      <Nav/>
      </Container>
     

    </div>
  )
}

export default Profile