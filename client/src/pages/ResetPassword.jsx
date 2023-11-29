// import { React, useState } from "react"; // , { useState }
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import SaveIcon from "@mui/icons-material/Save";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { outlinedInputClasses } from "@mui/material/OutlinedInput";
// import "../style/Login.css";
// import { useMutation } from "@apollo/client";
// import { RESET_PASSWORD } from "../utils/mutations/userMutations";

// const customTheme = createTheme({
//   palette: {
//     mode: "light",
//   },
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "--TextField-brandBorderColor": "#E0E3E7",
//           "--TextField-brandBorderHoverColor": "#B2BAC2",
//           "--TextField-brandBorderFocusedColor": "#f7e258",
//           "& label.Mui-focused": {
//             color: "var(--TextField-brandBorderFocusedColor)",
//           },
//           "& .MuiInputBase-input": {
//             color: "#F3F3F3",
//           },
//         },
//       },
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         notchedOutline: {
//           borderColor: "var(--TextField-brandBorderColor)",
//         },
//         root: {
//           [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
//             borderColor: "var(--TextField-brandBorderHoverColor)",
//           },
//           [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
//             borderColor: "var(--TextField-brandBorderFocusedColor)",
//           },
//           "& .MuiInputBase-input": {
//             color: "#F3F3F3",
//           },
//         },
//       },
//     },
//     MuiFilledInput: {
//       styleOverrides: {
//         root: {
//           "&:before, &:after": {
//             borderBottom: "2px solid var(--TextField-brandBorderColor)",
//           },
//           "&:hover:not(.Mui-disabled, .Mui-error):before": {
//             borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
//           },
//           "&.Mui-focused:after": {
//             borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
//           },
//           "& .MuiInputBase-input": {
//             color: "#F3F3F3",
//           },
//         },
//       },
//     },
//     MuiInput: {
//       styleOverrides: {
//         root: {
//           "&:before": {
//             borderBottom: "2px solid var(--TextField-brandBorderColor)",
//           },
//           "&:hover:not(.Mui-disabled, .Mui-error):before": {
//             borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
//           },
//           "&.Mui-focused:after": {
//             borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
//           },
//           "& .MuiInputBase-input": {
//             color: "#F3F3F3",
//           },
//         },
//       },
//     },
//   },
// });

// function ResetPassword() {
//   const [resetPassword, { error }] = useMutation(RESET_PASSWORD);
//   if (error) {
//     console.log(JSON.stringify(error));
//   }

//   const savePassword = async () => {
//     const newPassword = document.getElementById("newPassword").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;
//     // const token = window.location.href.split("token=").at(-1);
//     const email = window.location.href.split("=").at(-1);
//     console.log(email);
//     if (newPassword === confirmPassword) {
//       const { data } = await resetPassword({
//         variables: {
//           email,
//           newPassword,
//         },
//       });
//       console.log(data);
//     }

//     // if (newPassword === confirmPassword) {
//     //   const { data } = await resetPassword({
//     //     variables: {
//     //       newPassword,
//     //       token,
//     //     },
//     //   });
//     //   console.log(data);

//     //   console.log(token);
//     // }
//   };
//   const cancelPassword = () => {
//     console.log("canceled");
//   };

//   return (
//     <ThemeProvider theme={customTheme}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           height: "100vh",
//         }}
//       >
//         <TextField id="newPassword" label="New Password" variant="standard" />
//         <TextField
//           id="confirmPassword"
//           label="Confirm New Password"
//           variant="standard"
//         />
//         <Button
//           variant="contained"
//           id="forgotBtn"
//           style={{ marginTop: "16px" }}
//           onClick={savePassword}
//         >
//           <SaveIcon />
//           Save Password
//         </Button>
//         <Button
//           id="forgotBtnCancel"
//           variant="contained"
//           style={{ marginTop: "8px" }}
//           onClick={cancelPassword}
//         >
//           <DeleteIcon />
//           Cancel
//         </Button>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default ResetPassword;

import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import "../style/Login.css";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../utils/mutations/userMutations";

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

const commonNotificationStyle = {
  position: "fixed",
  bottom: "16px",
  left: "50%",
  transform: "translateX(-50%)",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "4px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
};

const successNotificationStyle = {
  ...commonNotificationStyle,
  backgroundColor: "#43a047",
};

const errorNotificationStyle = {
  ...commonNotificationStyle,
  backgroundColor: "#ff9494",
};

function ResetPassword() {
  const outerTheme = useTheme();
  const [resetPassword, { error }] = useMutation(RESET_PASSWORD);
  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (error) {
    console.log(JSON.stringify(error));
  }

  const savePassword = async () => {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = window.location.href.split("=").at(-1);

    const isValidPassword = (newPassword) => {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      return passwordPattern.test(newPassword);
    };
    console.log(isValidPassword);

    if (isValidPassword(newPassword)) {
      if (newPassword === confirmPassword) {
        try {
          // console.log(data);
          const { data } = await resetPassword({
            variables: {
              email,
              newPassword,
            },
          });
          console.log(data);
          setSuccess(true);

          // Show success notification
          setNotification({ open: true, message: "Password has been reset." });
          setTimeout(closeNotification, 2000);
        } catch (error) {
          // Handle the error and show an error notification
          setNotification({
            open: true,
            message: "Failed to reset password.",
          });
          setTimeout(closeNotification, 2000);
        }
      } else {
        // Show a notification for password mismatch
        setNotification({ open: true, message: "Passwords do not match." });
        setSuccess(false);
        setTimeout(closeNotification, 2000);
      }
    } else {
      setNotification({
        open: true,
        message:
          "Passwords do not meet required criteria. Please use at least 8 characters, 1 upper case and lowercase, a special character, and a number.",
      });
      setTimeout(closeNotification, 3000);
      setSuccess(false);
    }
  };

  const cancelPassword = () => {
    console.log("canceled");
  };

  // const handleCloseNotification = () => {
  //   // Close the notification
  //   setNotification({ open: false, message: "" });
  // };

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
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
          type="password"
          id="newPassword"
          label="New Password"
          variant="standard"
        />
        <TextField
          id="confirmPassword"
          label="Confirm New Password"
          variant="standard"
          type="password"
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
        <Link to="/">
          <Button
            id="forgotBtnCancel"
            variant="contained"
            style={{ marginTop: "8px" }}
            onClick={cancelPassword}
          >
            <HomeIcon />
            Home
          </Button>
        </Link>

        {notification.open && (
          <div
            style={success ? successNotificationStyle : errorNotificationStyle}
          >
            <span>{notification.message}</span>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default ResetPassword;
