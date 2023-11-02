import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';


const neon = '#EDFB60';
const black = '#212121';
const red = '#CE2029';
const white = '#F5F5F5'

function AccountEdit() {
  const buttonStyle = {
    backgroundColor: neon,
    color: black,
    margin: 10,
    
  };

  const deleteStyle = {
    backgroundColor: red,
    color: white,
    margin: 10,
    
  }
  return (
    <div id='editAccount'>
        <div>
          <TextField id="standard-basic" label="Update Email" variant="standard" />
        </div>
        <div>
          <TextField id="standard-basic" label="Update Password" variant="standard" />
        </div>
       
        <div>
        <Button 
      // onClick={handleSaveChanges}
      variant='contained'
      style={buttonStyle}
      >
        <SaveIcon/>
      Save Changes
      </Button>
      </div>
      <div>
      <Button
      variant = 'contained'
      style={deleteStyle}
      >
        <DeleteIcon/>
        Delete Account
      </Button>
      </div>
      
    </div>
  )
}

export default AccountEdit