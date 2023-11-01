import React from 'react'
import Nav from "../components/NavBar.jsx";
import Photo from "../components/Profile/ProfilePhoto.jsx";
import Edit from "../components/Profile/Edit.jsx";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';


function Profile() {

  //use auth to create ternary statement for 
  //1. whether or not edit profile button shows up
  //2. what user name to pop up 

  //Use query to display blubrs attatched to one user
  return (
    <div>
      <Container>
      <Photo/>
      <h1>Lillian Edwards</h1>
      <h2>lillianedwards</h2>
      <Button><a class="waves-effect  btn">103 Followers</a></Button>
      <Button><a class="waves-effect  btn">95 Followers</a></Button>
      <Button><a class="waves-effect  btn">{Edit}</a></Button>
      <h3>USER BLURBS - component?</h3>
      <Nav/>
      </Container>
     

    </div>
  )
}

export default Profile