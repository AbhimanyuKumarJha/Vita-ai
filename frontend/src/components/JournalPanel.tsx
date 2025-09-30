import type { FormEvent } from "react";
import { useRecoilState } from "recoil";
import { journalDraftAtom, journalEntriesAtom } from "../state/atoms";

export const JournalPanel = () => {
  const [draft, setDraft] = useRecoilState(journalDraftAtom);
  const [entries, setEntries] = useRecoilState(journalEntriesAtom);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setEntries((prev) => [draft.trim(), ...prev]);
    setDraft("");
  };

  return (
    <section className="bg-[rgba(37,33,78,0.9)] text-white rounded-[32px] p-7 flex flex-col gap-5 shadow-lg shadow-[rgba(37,33,78,0.35)]">
      <header className="grid grid-cols-3 gap-3">
        <button className="border-none rounded-[24px] py-2.5 px-3 bg-white/90 text-[#2f2760] font-semibold cursor-pointer">
          Journal
        </button>
        <button className="border-none rounded-[24px] py-2.5 px-3 bg-white/12 text-white/80 font-semibold cursor-pointer">
          Thought Garden
        </button>
        <button className="border-none rounded-[24px] py-2.5 px-3 bg-white/12 text-white/80 font-semibold cursor-pointer">
          Dream Assistant
        </button>
      </header>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="What\'s on your mind today?"
          rows={4}
          className="rounded-[24px] border-none p-4 text-[0.95rem] font-['Poppins',sans-serif] resize-vertical"
        />
        <button
          type="submit"
          className="self-end border-none rounded-[24px] py-2.5 px-4.5 bg-gradient-to-br from-[#8369ff] to-[#f56abc] text-white font-semibold cursor-pointer"
        >
          Save Entry
        </button>
      </form>

      <div>
        <h4 className="m-0 mb-3 text-[0.95rem] opacity-80 uppercase tracking-wider">
          Previous Entries
        </h4>
        <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
          {entries.map((entry, idx) => (
            <li
              key={`${entry}-${idx}`}
              className="py-3 px-3.5 rounded-[18px] bg-white/12 text-[0.9rem]"
            >
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default JournalPanel;
