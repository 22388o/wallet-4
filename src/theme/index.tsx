import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fa9600",
      light: "#ffaf19",
    },
    secondary: {
      main: "#eeefec",
      light: "#ffffff",
    },
    success: {
      main: "#329239",
    },
    info: {
      main: "#0096fa",
      light: "#26bcff",
    },
  },
});

export default Theme;
