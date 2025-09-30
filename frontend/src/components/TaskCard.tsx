import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import type { RecommendationTask } from "../types";

interface TaskCardProps {
  item: RecommendationTask;
  onComplete: (taskId: string) => void;
  onDismiss: (taskId: string) => void;
}

const categoryColors: Record<string, string> = {
  hydration: "#34c3ff",
  movement: "#7a5bff",
  sleep: "#f56abc",
  screen: "#ffa94d",
  mood: "#51cf66",
};

export const TaskCard = ({ item, onComplete, onDismiss }: TaskCardProps) => {
  const { task, score, rationale, isSubstitution } = item;
  const accent = categoryColors[task.category] ?? "#8c7cf0";

  return (
    <article
      className="bg-white/92 rounded-[24px] p-5 flex flex-col gap-3 min-h-[180px] border border-white/40 shadow-lg shadow-indigo-500/12 relative overflow-hidden origin-top"
      style={{
        backgroundImage: `radial-gradient(circle at top right, ${accent}33, transparent 70%)`,
        backgroundPosition: "top right -30%",
        backgroundSize: "160px 160px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-between text-[0.75rem] uppercase tracking-wider text-[#2f2760]/60">
        <span>{task.category}</span>
        <span className="font-semibold text-[#2f2760]/50">
          Score {score.toFixed(4)}
        </span>
      </div>
      <h3 className="m-0 text-[1.2rem] leading-snug text-[#2f2760]">
        {task.title}
      </h3>
      <p className="m-0 text-[0.85rem] text-[#2f2760]/60">
        Effort • {task.effortMinutes} min
      </p>
      <p className="m-0 text-[0.9rem] text-[#2f2760]/75">{rationale}</p>
      {isSubstitution && (
        <span className="self-start py-1.5 px-3 rounded-[18px] bg-indigo-500/12 text-indigo-600 text-[0.75rem] font-semibold">
          Smart swap
        </span>
      )}

      <div className="flex gap-3 mt-auto">
        <button
          className={`flex-1 border-none rounded-[20px] py-2.5 px-3.5 flex items-center justify-center gap-2 text-[0.95rem] font-semibold cursor-pointer transition-transform hover:-translate-y-0.5 bg-gradient-to-br from-[${accent}] to-indigo-500/80 text-white shadow-md shadow-indigo-500/25`}
          onClick={() => onComplete(task.id)}
        >
          <FiCheckCircle className="text-[1.1rem]" /> Complete
        </button>
        <button
          className="flex-1 border-none rounded-[20px] py-2.5 px-3.5 flex items-center justify-center gap-2 text-[0.95rem] font-semibold cursor-pointer transition-transform hover:-translate-y-0.5 bg-indigo-100/70 text-indigo-600"
          onClick={() => onDismiss(task.id)}
        >
          <FiXCircle className="text-[1.1rem]" /> Skip
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
