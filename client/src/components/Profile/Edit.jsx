import React from 'react';
import Photo from "../Profile/ProfilePhoto";
import Button from "@mui/material/Button";
import '../../style/Profile.css';
import TextField from "@mui/material/TextField";

function Edit() {
  return (
    <div>
      <Photo/>
      <h2>Edit Profile</h2>
      <div>
    <TextField id='standard-basic' label='First Name' variant='standard'/>
      </div>
      <div>
        <TextField id="standard-basic" label="Last Name" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Username" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Location" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Bio" variant="standard" />
      </div>
    </div>
  )
}

export default Edit