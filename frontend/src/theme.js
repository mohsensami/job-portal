import { createTheme } from "@mui/material/styles";
import { blue, lightBlue } from "@mui/material/colors";

export const theme = createTheme({
  // فعال‌سازی جهت کلی RTL در تم MUI
  direction: "rtl",
  textAlign: "right",
  fontFamily: "IRANSansX, sans-serif",
  typography: {
    fontFamily: "IRANSansX, sans-serif",
  },
  palette: {
    primary: {
      main: "#00a4bf",
    },
    secondary: {
      main: lightBlue[800],
      midNightBlue: "#fff",
    },
  },
});
