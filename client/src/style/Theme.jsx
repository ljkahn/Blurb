import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        main: "#F8F9FA", // Customize your primary color
      },
      secondary: {
        main: "#F8F9FA", // Customize your secondary color
      },
      // Add your custom colors here
      customColor: {
        main: "#FF5733", // Use your custom color code
      },
    },
    // Add more theme customizations here
  });
  
  export default theme;