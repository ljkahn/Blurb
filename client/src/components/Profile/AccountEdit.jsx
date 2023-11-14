import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { useMutation } from "@apollo/client";
import { EDIT_ACCOUNT } from "../../utils/mutations/userMutations";
import { DELETE_USER } from "../../utils/mutations/userMutations";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const neon = "#F7E258";
const black = "#212121";
const red = "#CE2029";
const white = "#F5F5F5";

function AccountEdit({ userData }) {
  navigation = useNavigate();
  const userId = userData._id;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [editAccount, { loading: editLoading, error: editError }] =
    useMutation(EDIT_ACCOUNT);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track password field focus

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleOpenAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleSaveChanges = () => {
    const { email, password } = formData;
    console.log(email, password);
    // console.log(formData);
    editAccount({
      variables: {
        email: email,
        password: password,
      },
    })
      .then((result) => {
        // console.log("Account updated!");
        handleOpenAlert("success", "Account updated successfully");
      })
      .catch((e) => {
        console.error("Error updating account:", e);
        handleOpenAlert("error", "Failed to update account");
      });
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleDeleteAccount = () => {
    setShowConfirmationModal(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handleConfirmDelete = () => {
    deleteUser({
      variables: {
        userId: userId,
      },
    })
      .then(() => {
        // console.log("Account Deleted");
        Auth.logout(navigation);
      })
      .catch((e) => {
        console.error("Error deleting account:", e);
      });
    setShowConfirmationModal(false);
  };

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

  const confirmStyle = {
    backgroundColor: black,
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
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="Update Password"
          variant="standard"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
        />
      </div>
        {isPasswordFocused && ( // Display the text only when password field is focused
          <div id="requirements">
            Password must be: <br/>
            8 characters or more. <br/>
            Contain at least one capital letter. <br/>
            Contain at least one lowercase letter. <br/>
            Contain at least one special character. <br/>
            Contain at least one number. <br/>
          </div>
        )}
      
      <div>
        <Button
          onClick={handleSaveChanges}
          variant="contained"
          style={buttonStyle}
          id="btn"
        >
          <SaveIcon />
          Save Changes
        </Button>
      </div>
      <div>
        <Button
          onClick={handleDeleteAccount}
          variant="contained"
          style={deleteStyle}
          id="btn"
        >
          <DeleteIcon />
          Delete Account
        </Button>
       
      </div>
      {showConfirmationModal && (
        <div className="confirmationModal">
          <p>Are you sure you want to delete your Blurb account? 😕</p>
          <Button
            variant="contained"
            style={confirmStyle}
            onClick={handleConfirmDelete}
            id="btn"
          >
            Yes
          </Button>
          <Button
            variant="contained"
            style={confirmStyle}
            onClick={() => setShowConfirmationModal(false)}
            id="btn"
          >
            No
          </Button>
        </div>
      )}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={alertSeverity}
          onClose={handleCloseAlert}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default AccountEdit;
