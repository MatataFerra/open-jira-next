import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#FDE8E9",
    },
    primary: {
      main: "#596475",
    },
    secondary: {
      main: "#FDE8E9",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#BC9EC1",
      secondary: "#E3BAC6",
    },
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});
