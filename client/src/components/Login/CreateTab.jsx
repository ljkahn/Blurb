import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations/userMutations";
import CloudinaryUploadWidget from "../Upload";
import Auth from "../../utils/auth";
import Photo from "../Profile/ProfilePhoto";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#f7e258",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
            "& .MuiInputBase-input": {
              color: "#F3F3F3",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
            "& .MuiInputBase-input": {
              color: "#F3F3F3",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
            "& .MuiInputBase-input": {
              color: "#F3F3F3",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
            "& .MuiInputBase-input": {
              color: "#F3F3F3",
            },
          },
        },
      },
    },
  });

function Create({ isRegistered }) {
  const outerTheme = useTheme();
  const navigation = useNavigate();
  // State to control the visibility of the modal
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track password field focus

//Set the form state to empty strings to await the values that will be used to create the user's account using the ADD_User mutation
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
  });

  //Acount for possible errors that could happen during the process of adding a user
  const [addUser, { error }] = useMutation(ADD_USER);
  if (error) {
    console.log(JSON.stringify(error));
  }

    //observe and register changes in the text fields 
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordPattern.test(password);
  };

  //check first that the email and password inputted match up with the regex statements used in the user model, if they do not handle the error with a user alert. 
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (
      !isValidEmail(formState.email) ||
      !isValidPassword(formState.password)
    ) {
      setIsAlertOpen(true); // Display the alert if validation fails
      return;
    }
    //Add in the values in the forms the the corresponding variables on the userModel
    try {
      const { data } = await addUser({
        variables: {
          username: formState.username,
          profile: {
            password: formState.password,
            email: formState.email,
            fullName: formState.fullName,
            profilePic: profileImg,
          },
        },
      });
      //Once the user's new information is collected successfully, register them to conditionally render the nav bar and remainder of the application
        // isRegistered(true);
        //use token to navigate the user to the home page. 
        Auth.login(data.addUser.token, navigation);
    } catch (error) {
      console.error(error);
    }
  };

// used to display the reminder of password requirements when the user clicks into the password text field. 
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  //closes alert that reminds user of password requirements if their current password does not meet them.
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };


  return (
    <div>
      <h2>Create Account</h2>
      <p>Add a profile picture, if you want!</p>
      <CloudinaryUploadWidget setProfileImg={setProfileImg} />
      <Photo profileImg={profileImg} />
      <form onSubmit={handleCreateSubmit}>
        <ThemeProvider theme={customTheme(outerTheme)}>
          <div>
            <TextField
              label="Full Name"
              variant="standard"
              name="fullName"
              type="text"
              value={formState.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              label="Email"
              variant="standard"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              label="Password"
              variant="standard"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
            {isPasswordFocused && ( // Display the text only when password field is focused
              <div style={{ fontSize: "0.8rem" }}>
                Password must contain at least 8 characters, 1 lowercase, 1
                uppercase, 1 special character, and 1 number.
              </div>
            )}
          </div>
          <div>
            <TextField
              label="Username"
              variant="standard"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
            />
          </div>

          <Button
            id="logCreateB"
            variant="contained"
            disableElevation
            type="submit"
          >
            Create Account
          </Button>
        </ThemeProvider>
      </form>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <MuiAlert severity="error" variant="filled" onClose={handleCloseAlert}>
          Please make sure your password has at least 8 characters, a lowercase,
          uppercase, special character, and a number.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Create;
