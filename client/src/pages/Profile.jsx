import React, {useState} from 'react'
import Photo from "../components/Profile/ProfilePhoto.jsx";
import Edit from "../components/Profile/Edit.jsx";
import AccountEdit from "../components/Profile/AccountEdit.jsx"
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../style/Profile.css';
import '../index.css';




function Profile() {
const [isEditVisible, setIsEditVisible] = useState(false);
const [showProfile, setShowProfile] = useState(true);
const [accountSettingsVisible, setAccountSettingsVisible] = useState(false);

const handleEditClick = () => {
  setIsEditVisible(true);
  setShowProfile(false);
  setAccountSettingsVisible(false)
};

const showAccountSettings = () => {
  setShowProfile(false);
  setIsEditVisible(false);
  setAccountSettingsVisible(true);
}
  //use auth to create ternary statement for 
  //1. whether or not edit profile button shows up
  //2. what user name to pop up 
  //4.sending bio info to the back and sending it back

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
    color: black,
   
  }


  return (
    <div >
      <IconButton>
      <ArrowBackIosIcon/>
      </IconButton>
     { showProfile ? (
      <Container id='profile'>
      <Photo/>
      <h1>Lillian Edwards</h1>
      <h2>lillianedwards</h2>
      <p id='info'>Love of yoga, my group 3 team members, and pissing off my cat! 🪩 🪐 🤍</p>
      <p id='info'> 📍 Duluth, MN </p>
      <Grid  >
    
      <Button id='btn' style={buttonStyle} variant="contained">103 Followers</Button>
      <Button id='btn' style={buttonStyle} variant="contained">95 Following</Button>
      </Grid>
      
      <Button id='btn' style={editStyle} variant="contained" onClick={handleEditClick}>Edit Profile </Button>
      
      <h3>USER BLURBS - component all the way down</h3>
     
      </Container>
     ) : (
     isEditVisible ? (
      <Edit showAccountSettings={showAccountSettings}/>
     ) : (
      accountSettingsVisible && <AccountEdit/>
     )  
     )}
     </div>
     );
}

export default Profile