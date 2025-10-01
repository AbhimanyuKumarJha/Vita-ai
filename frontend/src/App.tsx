import React from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MetricsBoard from "./components/MetricsBoard";
import HealthGoals from "./components/HealthGoals";
import MoodWidget from "./components/MoodWidget";
import JournalPanel from "./components/JournalPanel";
import "./App.css";
import TaskDeck from "./components/TaskDeck";
import RecommendationCard from "./components/RecommendationCard";
import Recommendation from "./components/Recommendation";

function App() {
  console.log("App component rendered");
  return (
    <>
      {/* <h1>App</h1> */}
      {console.log("App component rendered from inside JSX")}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-5">
        <div className="grid grid-cols-[auto_1fr] gap-5">
          {/* Sidebar */}
          <div className="hidden lg:block w-20">
            <Sidebar />
          </div>
          <Sidebar />

          {/* Main Content */}
          <div className="flex flex-col gap-5">
            {/* TopBar */}
            <TopBar />

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-15 gap-5">
              <MoodWidget className="md:col-span-6" />
              <MetricsBoard className="md:col-span-4" />
              <div className="md:col-span-5 flex flex-col gap-5">
                <HealthGoals className="md:col-span-5" />
                <div className="self-stretch h-36 rounded-2xl md:col-span-5 bg-[url('/yoga.jpg')] bg-cover bg-center col-end" />
              </div>
              <JournalPanel className="md:col-span-9" />
              {/* <TaskDeck className="md:col-span-6" /> */}
              <Recommendation className="md:col-span-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
