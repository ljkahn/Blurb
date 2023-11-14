import { React, useState } from "react"; // , { useState }
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../../utils/mutations/userMutations";
// import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Auth from "../../utils/auth";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import emailjs from "emailjs-com";

const customTheme = createTheme({
  palette: {
    mode: "light",
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
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
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
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
          },
          "& .MuiInputBase-input": {
            color: "#F3F3F3",
          },
        },
      },
    },
  },
});

function ForgotPassword() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [emailResult, setEmailResult] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);

    if (snackbarSeverity === "success") {
      setEmailResult(true);
      setSnackbarMessage("Password reset email has been sent.");
    } else {
      setEmailResult(false);
      setSnackbarMessage("Failed to send reset email. Please try again.");
    }
  };

  const handleSendEmail = async () => {
    const userEmail = document.getElementById("standard-basic").value;
    console.log(userEmail);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(userEmail);

    console.log(isValidEmail);

    if (!isValidEmail) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please enter a valid email address.");
      setOpenSnackbar(true);
      setEmailResult(false);
      return;
    } else {
      const templateParams = {
        to_email: userEmail,
      };

      const serviceId = "service_cktbx3y";
      const templateId = "template_sjuqpvd";
      const userId = "8-dm5hdWgZjnQ7aaU";

      try {
        const response = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          userId
        );
        console.log("EmailJS response:", response);

        if (response && response.text === "OK") {
          console.log("Email sent successfully");
          setSnackbarSeverity("success");
          setSnackbarMessage("Password reset email has been sent.");
          setOpenSnackbar(true);
          setEmailResult(true);
        } else {
          console.error("Error sending email. Response:", response);
          setSnackbarSeverity("error");
          setSnackbarMessage("Failed to send reset email. Please try again.");
          setOpenSnackbar(true);
          setEmailResult(false);
        }
      } catch (error) {
        console.error("Error sending email:", error);
        console.error("EmailJS error details:", error?.response?.text);
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to send reset email. Please try again.");
        setOpenSnackbar(true);
        setEmailResult(false);
      }
    }
  };
  return (
    <ThemeProvider theme={customTheme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
        }}
      >
        <TextField id="standard-basic" label="User Email" variant="standard" />
        <Button
          variant="contained"
          className="btn"
          style={{ marginTop: "16px" }}
          onClick={handleSendEmail}
        >
          <SaveIcon />
          Send Email
        </Button>
        <Button
          variant="contained"
          className="btn"
          style={{ marginTop: "8px" }}
        >
          <DeleteIcon />
          Cancel
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          {emailResult ? (
            <Alert onClose={handleSnackbarClose} severity="success">
              {snackbarMessage}
            </Alert>
          ) : (
            <Alert onClose={handleSnackbarClose} severity="error">
              {snackbarMessage}
            </Alert>
          )}
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default ForgotPassword;
