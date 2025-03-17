import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/Authcontext.jsx";
import { ClientContextProvider } from "./context/Clientcontext.jsx";
import { TokenContextProvider } from "./context/TokenContext.jsx";

createRoot(document.getElementById("root")).render(
  <TokenContextProvider>
    <ClientContextProvider>
      <AuthContextProvider>
        {/* <StrictMode> */}
        <App />
        {/* </StrictMode> */}
      </AuthContextProvider>
    </ClientContextProvider>
  </TokenContextProvider>
);
