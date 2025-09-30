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

export const HealthGoals = () => {
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
    <section className="bg-white/85 rounded-[28px] p-6 flex flex-col gap-4.5 shadow-lg shadow-indigo-500/10">
      <h2 className="m-0 text-[1.4rem] text-[#2f2760]">Health Goals</h2>
      <div className="flex flex-col gap-4">
        {goals.map((goal) => (
          <article
            key={goal.id}
            className={`flex items-center gap-4.5 bg-purple-50/60 rounded-[22px] p-4 ${
              goal.tone === "emerald"
                ? "goal-emerald"
                : goal.tone === "violet"
                ? "goal-violet"
                : "goal-pink"
            }`}
          >
            <div
              className="relative w-16 h-16 rounded-full grid place-items-center font-semibold text-[#2f2760] bg-gradient-to-r"
              style={{
                backgroundImage: `conic-gradient(${
                  goal.tone === "emerald"
                    ? "#31c98f"
                    : goal.tone === "violet"
                    ? "#9671ff"
                    : "#f471b5"
                } ${Math.round(
                  goal.progress * 100
                )}%, rgba(236, 231, 255, 0.6) ${Math.round(
                  goal.progress * 100
                )}%)`,
              }}
            >
              <div className="absolute inset-[6px] bg-white rounded-full z-0"></div>
              <span className="relative z-1">
                {Math.round(goal.progress * 100)}%
              </span>
            </div>
            <div>
              <h3 className="m-0 text-base text-[#2f2760]">{goal.title}</h3>
              <p className="mt-1.5 mb-0 text-[#2f2760]/60 text-[0.85rem]">
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
