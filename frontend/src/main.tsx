import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./App.tsx";
import HealthGoals from "./components/HealthGoals.tsx";
import Landing from "./pages/landing.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RecoilRoot>
    {/* <App /> */}
    {/* <HealthGoals /> */}
    <Landing />
  </RecoilRoot>
  // </StrictMode>
);
