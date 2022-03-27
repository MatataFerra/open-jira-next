import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFE66D",
    },
    primary: {
      main: "#1A535C",
    },
    secondary: {
      main: "#4ECDC4",
    },

    error: {
      main: red.A400,
    },
    text: {
      primary: "#F7FFF7",
      secondary: "#F7FFF7",
    },
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#F7FFF7",
          color: "#FF6B6B",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A535C",
        },
      },
    },
  },
});
