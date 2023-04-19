import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: (factor) => `${0.25 * factor}rem`,
  palette: {
    primary: {
      main: "#2C979E",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#000000",
    },
    secondary: {
      main: "#9F0909",
      light: "",
      dark: "#6B1C1C",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#C4C4C4",
      light: "",
      dark: "#D9D9D9",
      contrastText: "#000000",
    },
    tertiary: {
      main: "#EC8A17",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#000000",
    },
    danger: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#000000",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "",
    },
  },
});

export default theme;
