import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { FiSmile, FiDroplet, FiMoon, FiActivity } from "react-icons/fi";
import { metricsAtom } from "../state/atoms";
import type { UserMetrics } from "../types";

const getMoodLabel = (mood: number) => {
  if (mood >= 4) return "Elated";
  if (mood === 3) return "Content";
  if (mood === 2) return "Pensive";
  return "Low";
};

const formatMetrics = (metrics: UserMetrics | null) => {
  if (!metrics) {
    return {
      mood: { label: "Loading...", value: "—" },
      sleep: { label: "", value: "—" },
      water: { label: "", value: "—" },
      steps: { label: "", value: "—" },
    };
  }

  return {
    mood: {
      label: getMoodLabel(metrics.mood),
      value: `${metrics.mood}/5`,
    },
    sleep: {
      label: metrics.sleepHours >= 7 ? "Synced" : "Needed",
      value: `${metrics.sleepHours} / 8 h`,
    },
    water: {
      label: metrics.waterMl >= 2000 ? "Synced" : "Drink up",
      value: `${(metrics.waterMl / 1000).toFixed(1)} / 2.0 L`,
    },
    steps: {
      label: metrics.steps >= 8000 ? "Synced" : "Keep going",
      value: `${metrics.steps.toLocaleString()}`,
    },
  };
};

export const MetricsBoard = () => {
  const metrics = useRecoilValue(metricsAtom);
  const formatted = useMemo(() => formatMetrics(metrics), [metrics]);

  return (
    <section className="bg-white/82 rounded-[28px] p-7 flex flex-col gap-6 shadow-lg shadow-indigo-500/12">
      <header className="flex items-baseline justify-between">
        <div>
          <h2 className="m-0 text-[1.5rem] text-[#2f2760]">General Metrics</h2>
          <span className="text-[0.85rem] text-[#2f2760]/60">Last Week</span>
        </div>
        <span className="text-[0.85rem] bg-indigo-500/10 py-2 px-4 rounded-[20px] text-indigo-600">
          Mood Snapshot
        </span>
      </header>

      <div className="grid grid-cols-4 gap-4.5">
        <article className="bg-gradient-to-b from-indigo-300/30 to-purple-200/55 rounded-[24px] p-4.5 flex flex-col gap-3 min-h-[140px] relative overflow-hidden border border-white/22 text-[#271e55]">
          <div className="w-[42px] h-[42px] rounded-[16px] grid place-items-center text-[1.25rem] bg-white/70 text-indigo-600">
            <FiSmile />
          </div>
          <h3 className="m-0 text-base text-[#2f2760]">Mood</h3>
          <p className="m-0 text-[1.2rem] font-semibold text-[#2f2760]">
            {formatted.mood.label}
          </p>
          <span className="text-[0.85rem] text-[#271e55]/75">
            {formatted.mood.value}
          </span>
        </article>

        <article className="bg-purple-50/80 rounded-[24px] p-4.5 flex flex-col gap-3 min-h-[140px] relative overflow-hidden border border-white/22">
          <div className="w-[42px] h-[42px] rounded-[16px] grid place-items-center text-[1.25rem] bg-pink-500/12 text-pink-500">
            <FiMoon />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.75rem] text-[#2f2760]/60">
              {formatted.sleep.label}
            </span>
            <h3 className="m-0 text-base text-[#2f2760]">Sleep</h3>
          </div>
          <span className="text-[1.2rem] font-semibold text-[#2f2760]">
            {formatted.sleep.value}
          </span>
        </article>

        <article className="bg-purple-50/80 rounded-[24px] p-4.5 flex flex-col gap-3 min-h-[140px] relative overflow-hidden border border-white/22">
          <div className="w-[42px] h-[42px] rounded-[16px] grid place-items-center text-[1.25rem] bg-blue-400/12 text-blue-400">
            <FiDroplet />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.75rem] text-[#2f2760]/60">
              {formatted.water.label}
            </span>
            <h3 className="m-0 text-base text-[#2f2760]">Water Intake</h3>
          </div>
          <span className="text-[1.2rem] font-semibold text-[#2f2760]">
            {formatted.water.value}
          </span>
        </article>

        <article className="bg-gradient-to-b from-blue-300/25 to-cyan-100/40 rounded-[24px] p-4.5 flex flex-col gap-3 min-h-[140px] relative overflow-hidden border border-white/22">
          <div className="w-[42px] h-[42px] rounded-[16px] grid place-items-center text-[1.25rem] bg-blue-600/12 text-blue-600">
            <FiActivity />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.75rem] text-[#2f2760]/60">Steps</span>
            <h3 className="m-0 text-base text-[#2f2760]">Synced</h3>
          </div>
          <span className="text-[1.2rem] font-semibold text-[#2f2760]">
            {formatted.steps.value}
          </span>
        </article>
      </div>
    </section>
  );
};

export default MetricsBoard;
