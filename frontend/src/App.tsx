// import React from "react";
import { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MetricsBoard from "./components/MetricsBoard";
import HealthGoals from "./components/HealthGoals";
import MoodWidget from "./components/MoodWidget";
import JournalPanel from "./components/JournalPanel";
import "./App.css";
import { FramerModal, ModalContent } from "./components/ui/modal";
// import TaskDeck from "./components/TaskDeck";
// import RecommendationCard from "./components/RecommendationCard";
import Recommendation from "./components/Recommendation";

function App() {
  // console.log("App component rendered");
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {/* <h1>App</h1> */}
      {/* {console.log("App component rendered from inside JSX")} */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-5">
        <div className="grid grid-cols-[auto_1fr] gap-5">
          {/* Sidebar */}
          <div className="hidden lg:block w-20">
            <Sidebar />
          </div>
          {/* <Sidebar /> */}

          <Dialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
          {/* Main Content */}
          <div className="flex flex-col gap-5">
            {/* TopBar */}
            <TopBar setModalOpen={setModalOpen} />

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

const Dialog = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}) => {
  return (
    <FramerModal open={modalOpen} setOpen={setModalOpen}>
      <ModalContent>
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight dark:text-white text-black">
            About Vita AI
          </h2>
          <p className="text-sm text-muted-foreground dark:text-white text-black">
            This project is given by IHub as a assignment to build a Smart Task
            Manager. and developed by <strong>Abhimanyu Kumar Jha</strong>.
          </p>
        </div>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium leading-none text-right">
              Name
            </label>
            <input
              className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
              id="name"
              defaultValue="Pedro Duarte"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium leading-none text-right">
              Username
            </label>
            <input
              className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
              id="username"
              defaultValue="@peduarte"
            />
          </div>
        </div> */}
        <div className="mt-4">
          <button
            onClick={() => setModalOpen(false)}
            className="w-full p-3 bg-black dark:bg-white text-white dark:text-black rounded-md"
            type="button"
          >
            Got it, thanks!
          </button>
        </div>
      </ModalContent>
    </FramerModal>
  );
};

export default App;
