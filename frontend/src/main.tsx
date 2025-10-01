import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./state/AppProvider";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AppProvider>
    <App />

    {/* <HealthGoals /> */}
    {/* <Landing /> */}
  </AppProvider>
  // </StrictMode>
);
