import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRecoilValue } from "recoil";
import TaskCard from "./TaskCard";
import { useRecommendations } from "../hooks/useRecommendations";
import { errorAtom } from "../state/atoms";

export const TaskDeck = () => {
  const { tasks, loading, completeTask, dismissTask, refresh } =
    useRecommendations();
  const errorMessage = useRecoilValue(errorAtom);
  const deckRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!deckRef.current || tasks.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".task-card",
        { y: 24, opacity: 0, rotateX: -8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        }
      );
    }, deckRef);

    return () => ctx.revert();
  }, [tasks]);

  return (
    <section className="flex flex-col gap-6 rounded-[28px] bg-white/90 p-6 shadow-lg">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="m-0 text-2xl text-[#2f2760]">Smart Task Manager</h2>
          <p className="mt-1 text-[#2f2760]/60">
            Your top four wellness actions curated for the moment.
          </p>
        </div>
        <button
          className="rounded-[22px] bg-[#7b68ee]/12 px-5 py-2.5 font-semibold text-[#6b56ff] cursor-pointer border-none"
          onClick={() => refresh()}
        >
          Refresh
        </button>
      </div>

      {errorMessage && (
        <div className="rounded-lg border border-[#ff566e]/24 bg-[#ff566e]/12 p-3 text-sm text-[#b82c42]">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" ref={deckRef}>
        {loading && tasks.length === 0
          ? [...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="h-[180px] rounded-[24px] bg-gradient-to-r from-[#e9e6ff]/60 via-white/90 to-[#e9e6ff]/60 bg-[length:400px_100%] animate-shimmer"
              />
            ))
          : tasks.map((item) => (
              <TaskCard
                key={item.task.id}
                item={item}
                onComplete={completeTask}
                onDismiss={dismissTask}
              />
            ))}
      </div>
    </section>
  );
};

export default TaskDeck;
