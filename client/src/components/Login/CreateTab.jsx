import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CloudinaryUploadWidget from "../Upload";
import Photo from "../Profile/ProfilePhoto";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations/userMutations";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track password field focus

  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  if (error) {
    console.log(JSON.stringify(error));
  }

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (
      !isValidEmail(formState.email) ||
      !isValidPassword(formState.password)
    ) {
      setIsAlertOpen(true); // Display the alert if validation fails
      return;
    }

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

      isRegistered(true);
      Auth.login(data.addUser.token, navigation);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
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

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
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
