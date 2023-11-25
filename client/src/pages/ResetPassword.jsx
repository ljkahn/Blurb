import { React, useState } from "react"; // , { useState }
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import "../style/Login.css";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../utils/mutations/userMutations";

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

function ResetPassword() {
  const [resetPassword, { error }] = useMutation(RESET_PASSWORD);
  if (error) {
    console.log(JSON.stringify(error));
  }

  const savePassword = async () => {
    console.log("saved");
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (newPassword === confirmPassword) {
      const token = window.location.href.split("=").at(-1);
      const { data } = await resetPassword({
        variables: {
          newPassword,
          token,
        },
      });
      console.log(data);

      console.log(token);
    }
  };
  const cancelPassword = () => {
    console.log("canceled");
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
        <TextField id="newPassword" label="New Password" variant="standard" />
        <TextField
          id="confirmPassword"
          label="Confirm New Password"
          variant="standard"
        />
        <Button
          variant="contained"
          id="forgotBtn"
          style={{ marginTop: "16px" }}
          onClick={savePassword}
        >
          <SaveIcon />
          Save Password
        </Button>
        <Button
          id="forgotBtnCancel"
          variant="contained"
          style={{ marginTop: "8px" }}
          onClick={cancelPassword}
        >
          <DeleteIcon />
          Cancel
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default ResetPassword;
