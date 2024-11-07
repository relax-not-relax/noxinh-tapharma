import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </ThemeProvider>
);
