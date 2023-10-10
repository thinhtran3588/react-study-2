"use client";

import { Provider } from "react-redux";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { store } from "@app/store/store";
import { AppFirebase } from "./app-firebase";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        style: {
          textTransform: "none",
          borderRadius: 9999,
        },
      },
    },
  },
});

export const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <AppFirebase>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </StyledEngineProvider>
      </AppFirebase>
    </Provider>
  );
};
