import { useMemo, useState, useEffect } from "react";
// Removing Recoil dependency
import type { UserMetrics } from "../types";

interface Goal {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  tone: "emerald" | "violet" | "pink";
}

const getGoals = (waterMl: number) => {
  const waterProgress = Math.min(waterMl / 3000, 1);
  const proteinProgress = 0.65; // placeholder > would come from nutrition engine
  const habitProgress = 0.8;

  return [
    {
      id: "water",
      title: "Drink 3 liters of water daily",
      subtitle: `${Math.max(
        0,
        3000 - waterMl
      ).toLocaleString()} ml needed by end of day`,
      progress: waterProgress,
      tone: "emerald",
    },
    {
      id: "protein",
      title: "Daily proteins 1000 Kcal",
      subtitle: "You have almost met today's protein goal.",
      progress: proteinProgress,
      tone: "violet",
    },
    {
      id: "habit",
      title: "New habit: Start daily yoga",
      subtitle: "Just one more session this week to stay on track.",
      progress: habitProgress,
      tone: "pink",
    },
  ] as Goal[];
};

// Mock data to replace what was coming from Recoil
const mockMetrics: UserMetrics = {
  date: new Date().toISOString().split("T")[0],
  waterMl: 1800,
  steps: 8500,
  sleepHours: 7.5,
  screenTimeMin: 185,
  mood: 4,
};

export const HealthGoals = ({ className }: { className: string }) => {
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);

  // Simulate fetching metrics
  useEffect(() => {
    // In a real app, this would be an API call
    setMetrics(mockMetrics);
  }, []);

  const goals = useMemo(
    () => getGoals(metrics?.waterMl ?? 0),
    [metrics?.waterMl]
  );

  return (
    <section className={`flex flex-col ${className}`}>
      <h2 className="m-0 text-xl font-semibold text-black">Health Goals</h2>
      <div className="flex flex-col gap-1 bg-slate-200/70 rounded-3xl backdrop-blur-md  p-2">
        {goals.map((goal) => (
          <article
            key={goal.id}
            className="flex items-center gap-4.5 hover:bg-slate-100 transition-all duration-250 
           rounded-2xl p-4 cursor-pointer"
          >
            <div
              className={`
              relative w-16 h-16 rounded-full grid place-items-center font-semibold
              ${
                goal.tone === "emerald"
                  ? "text-emerald-600 bg-emerald-100"
                  : goal.tone === "violet"
                  ? "text-violet-600 bg-violet-100"
                  : "text-pink-600 bg-pink-100"
              }
              shadow-[inset_4px_4px_6px_rgba(0,0,0,0.1),inset_-4px_-4px_6px_rgba(255,255,255,0.7)]
              `}
              style={{
                background: `conic-gradient(${
                  goal.tone === "emerald"
                    ? "#31c98f"
                    : goal.tone === "violet"
                    ? "#9671ff"
                    : "#f471b5"
                } ${Math.round(goal.progress * 100)}%, ${
                  goal.tone === "emerald"
                    ? "#d1fae5"
                    : goal.tone === "violet"
                    ? "#ede9fe"
                    : "#fce7f3"
                } ${Math.round(goal.progress * 100)}%)`,
              }}
            >
              <div className="absolute inset-[6px] bg-slate-200 rounded-full z-0"></div>
              <span className="relative z-1 justify-start text-black text-xs font-semibold">
                {Math.round(goal.progress * 100)}%
              </span>
            </div>
            <div>
              <h3 className="m-0 justify-start text-black text-base font-medium">
                {goal.title}
              </h3>
              <p className="mt-1.5 mb-0 text-black font-normal text-xs">
                {goal.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HealthGoals;
