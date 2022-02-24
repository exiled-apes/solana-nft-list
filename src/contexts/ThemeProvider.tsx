import React, { useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const defaultTheme = createTheme({
  typography: {
    fontFamily: "georgia",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#ff8b0d",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background: linear-gradient(162deg, rgba(51,51,51,1) 19%, rgba(14,14,14,1) 97%);
        }
      `,
    },
  },
});

export default function ThemeProvider({
  children,
  theme,
}: {
  children: any;
  theme?: any;
}) {
  const createdTheme = useMemo(
    () => (theme ? createTheme(theme) : null),
    [theme]
  );
  return (
    <MuiThemeProvider theme={createdTheme || defaultTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
