import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { useMutation } from "@apollo/client";
import { EDIT_ACCOUNT } from "../../utils/mutations/userMutations";

const neon = "#EDFB60";
const black = "#212121";
const red = "#CE2029";
const white = "#F5F5F5";

function AccountEdit() {
  const [formData, setFormData] = useState({
    email:"",
    password: "",
  })

  const [editAccount, {loading, error}] = useMutation(EDIT_ACCOUNT);

  const handleSaveChanges = () => {
    editAccount({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    })
    .then((result) => {
      console.log("Account updated!");
      //Handle success by throwing an alert or navigating back to profile. 
    })
    .catch((e) => {
      console.error('Error updating account:', e);
      //Handle errors, show an alert
    })
  }
  const buttonStyle = {
    backgroundColor: neon,
    color: black,
    margin: 10,
  };

  const deleteStyle = {
    backgroundColor: red,
    color: white,
    margin: 10,
  };
  return (
    <div id="editAccount">
      <div>
        <TextField
          id="standard-basic"
          label="Update Email"
          variant="standard"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="Update Password"
          variant="standard"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
      </div>

      <div>
        <Button
          onClick={handleSaveChanges}
          variant="contained"
          style={buttonStyle}
        >
          <SaveIcon />
          Save Changes
        </Button>
      </div>
      <div>
        <Button variant="contained" style={deleteStyle}>
          <DeleteIcon />
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default AccountEdit;
