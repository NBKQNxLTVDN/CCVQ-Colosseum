import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  spacing: (factor) => `${0.25 * factor}rem`,
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#000000",
    },
    secondary: {
      main: "#C54D4D",
      light: "",
      dark: "",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#C4C4C4",
      light: "",
      dark: "",
      contrastText: "#000000",
    },
    tertiary: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "",
    },
    danger: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "",
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
