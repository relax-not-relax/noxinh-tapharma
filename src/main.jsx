import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { SnackbarProvider } from "notistack";
import { CartProvider } from "./provider/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <ThemeProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </CartProvider>
);
