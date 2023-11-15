import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations/userMutations";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Auth from "../../utils/auth";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { Link } from "react-router-dom";

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

function LoginTab({ isRegistered }) {
  const outerTheme = useTheme();
  const navigation = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [login, { error }] = useMutation(LOGIN_USER);
  if (error) {
    console.log(JSON.stringify(error));
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(formState);

    try {
      const { data } = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });

      isRegistered(true);
      Auth.login(data.login.token, navigation);
    } catch (error) {
      console.error(error);
      if (error.message === "Invalid email or password") {
        setErrorMessage("Incorrect login credentials. Please try again.");
        setSnackbarOpen(true);
      }
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <ThemeProvider theme={customTheme(outerTheme)}>
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
            />
          </div>
          <Link id="forgot" to="/forgotPassword"> Forgot password?</Link>
          <Button
            id="logCreateB"
            variant="contained"
            disableElevation
            type="submit"
          >
            Login
          </Button>
        </ThemeProvider>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust this as needed
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default LoginTab;
