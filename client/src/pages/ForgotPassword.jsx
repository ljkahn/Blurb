import React from "react"; // , { useState }
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
    mode: "light", // You can change this to "dark" or any other mode you prefer
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
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSendEmail = () => {
    const userEmail = document.getElementById("standard-basic").value;

    // Check if the email is not empty
    if (!userEmail) {
      return;
    }

    // Your EmailJS template ID and user ID
    const templateParams = {
      to_email: userEmail,
      // Add other template variables as needed
    };

    // Replace these with your EmailJS service ID, template ID, and user ID
    const serviceId = "service_cktbx3y";
    const templateId = "template_sjuqpvd";
    const userId = "8-dm5hdWgZjnQ7aaU";

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        console.error("EmailJS error details:", error?.response?.text); // Log the detailed error message from EmailJS
      });
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
          id="btn"
          style={{ marginTop: "16px" }}
          onClick={handleSendEmail}
        >
          <SaveIcon />
          Send Email
        </Button>
        <Button variant="contained" id="btn" style={{ marginTop: "8px" }}>
          <DeleteIcon />
          Cancel
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            Email has been sent!
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default ForgotPassword;
