import React from "react";
import { RecoilRoot } from "recoil";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MetricsBoard from "./components/MetricsBoard";
import HealthGoals from "./components/HealthGoals";
import MoodWidget from "./components/MoodWidget";
import JournalPanel from "./components/JournalPanel";
import "./App.css";

function App() {
  console.log("App component rendered");
  return (
    // <RecoilRoot>
    <>
      {/* <h1>App</h1> */}
      {console.log("App component rendered from inside JSX")}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-5">
        <div className="grid grid-cols-[auto_1fr] gap-5">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex flex-col gap-5">
            {/* TopBar */}
            <TopBar />

            {/* Main Grid */}
            <div className="grid grid-cols-[1fr_360px] gap-5">
              {/* Left Column */}
              <div className="flex flex-col gap-5">
                {/* Metrics and Health Goals */}
                <div className="grid grid-cols-2 gap-5">
                  {/* <MetricsBoard /> */}
                  {/* <HealthGoals /> */}
                </div>

                {/* Journal Panel */}
                {/* <JournalPanel /> */}
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-5">
                <MoodWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // </RecoilRoot>
  );
}

export default App;
