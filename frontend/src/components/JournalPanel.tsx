import type { FormEvent } from "react";
import { useAppState } from "../state/useAppState";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ButtonAnimatedGradient from "./ui/button";

export const JournalPanel = () => {
  const {
    journalDraft: draft,
    setJournalDraft: setDraft,
    journalEntries: entries,
    setJournalEntries: setEntries,
  } = useAppState();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setEntries([draft.trim(), ...entries]);
    setDraft("");
  };

  const [selectedTab, setSelectedTab] = useState("journal");

  return (
    <section className="bg-violet-100/70 rounded-3xl backdrop-blur-[2px] p-7 flex flex-col gap-5 hover:shadow-lg hover:shadow-[rgba(37,33,78,0.35)] transition-shadow duration-250">
      <header className="grid grid-cols-3 items-center gap-3 bg-purple-400 rounded-3xl h-12 px-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedTab("journal")}
          className={`h-9 border-none rounded-3xl py-2.5 px-3 ${
            selectedTab === "journal"
              ? "bg-white text-indigo-900"
              : "bg-transparent text-white/80"
          } font-semibold cursor-pointer text-center items-center flex justify-center`}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedTab === "journal" ? [1, 1.1, 1] : 1,
            transition: { duration: 0.3 },
          }}
        >
          Journal
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedTab("thoughts")}
          className={`h-9 border-none rounded-3xl py-2.5 px-3 ${
            selectedTab === "thoughts"
              ? "bg-white text-indigo-900"
              : "bg-transparent text-white/80"
          } font-semibold cursor-pointer text-center items-center flex justify-center`}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedTab === "thoughts" ? [1, 1.1, 1] : 1,
            transition: { duration: 0.3 },
          }}
        >
          Thought Garden
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedTab("dreams")}
          className={`h-9 border-none rounded-3xl py-2.5 px-3 ${
            selectedTab === "dreams"
              ? "bg-white text-indigo-900"
              : "bg-transparent text-white/80"
          } font-semibold cursor-pointer text-center items-center flex justify-center`}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedTab === "dreams" ? [1, 1.1, 1] : 1,
            transition: { duration: 0.3 },
          }}
        >
          Dream Assistant
        </motion.button>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === "journal" && (
            <>
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="What\'s on your mind today?"
                  rows={4}
                  className="rounded-[24px] border-none bg-white p-4 text-[0.95rem] font-['Poppins',sans-serif] resize-vertical focus:outline-slate-300"
                />
                {/* <button
                  type="submit"
                  className="self-end border-none rounded-[24px] py-2.5 px-4.5 bg-gradient-to-br from-[#8369ff] to-[#f56abc] text-white font-semibold cursor-pointer"
                >
                  Save Entry
                </button> */}
                <div className="w-full flex justify-end">
                  <ButtonAnimatedGradient type="submit" className="mx-0">
                    Save Entry
                  </ButtonAnimatedGradient>
                </div>
              </form>

              <div>
                <h4 className="m-0 mb-3 text-indigo-900 font-medium leading-7 text-sm">
                  Previous Entries
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  {entries.map((entry, idx) => (
                    <li
                      key={`${entry}-${idx}`}
                      className="py-3 px-5 rounded-3xl text-sm text-indigo-950 bg-gray-300"
                    >
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {selectedTab === "thoughts" && (
            <div className="p-4 rounded-2xl flex flex-col items-center gap-4">
              <div className="relative flex items-center justify-center h-24 w-24">
                <motion.div
                  className="absolute rounded-full bg-indigo-200"
                  style={{ width: 96, height: 96 }}
                  animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
                <div className="relative rounded-full bg-indigo-500 w-16 h-16" />
              </div>
              <h3 className="text-sm font-semibold">Transform your thoughts</h3>
              <p className="text-sm mb-3">
                Vita can transform your journal entries into potry and music
              </p>
              <button
                type="button"
                className="mx-0 bg-indigo-800 hover:bg-indigo-900 transition-colors duration-300 cursor-pointer text-white px-4 py-2.5 rounded-3xl font-semibold text-sm"
              >
                Generate Creative Content
              </button>
            </div>
          )}

          {selectedTab === "dreams" && (
            <>
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Describe your dreams here..."
                  rows={4}
                  className="rounded-[24px] border-none bg-white p-4 text-[0.95rem] font-['Poppins',sans-serif] resize-vertical focus:outline-slate-300"
                />
                {/* <button
                  type="submit"
                  className="self-end border-none rounded-[24px] py-2.5 px-4.5 bg-gradient-to-br from-[#8369ff] to-[#f56abc] text-white font-semibold cursor-pointer"
                >
                  Save Entry
                </button> */}
                <div className="w-full flex justify-end gap-3">
                  <ButtonAnimatedGradient
                    type="submit"
                    className="mx-0 text-sm"
                  >
                    Save Entry
                  </ButtonAnimatedGradient>
                  <button
                    type="button"
                    className="mx-0 bg-indigo-800 hover:bg-indigo-900 transition-colors duration-300 cursor-pointer text-white px-4 py-2.5 rounded-3xl font-semibold text-sm"
                  >
                    Analyze Dreams Data
                  </button>
                </div>
              </form>

              <div>
                <h4 className="m-0 mb-3 text-indigo-900 font-medium leading-7 text-sm">
                  Dream Journal
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  {entries.map((entry, idx) => (
                    <li
                      key={`${entry}-${idx}`}
                      className="py-3 px-5 rounded-3xl text-sm text-indigo-950 bg-gray-300"
                    >
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default JournalPanel;
