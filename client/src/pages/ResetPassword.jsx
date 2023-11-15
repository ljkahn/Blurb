import { React, useState } from "react"; // , { useState }
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

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
  const savePassword = () => {
    console.log("saved");
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
        <TextField
          id="standard-basic"
          label="New Password"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          label="Confirm New Password"
          variant="standard"
        />
        <Button
          variant="contained"
          className="btn"
          style={{ marginTop: "16px" }}
          onClick={savePassword}
        >
          <SaveIcon />
          Save Password
        </Button>
        <Button
          variant="contained"
          className="btn"
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
