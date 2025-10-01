import { useAppState } from "../state/useAppState";
import { GlassWater } from "lucide-react";
import FallingText from "@/components/ui/falling-text";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Sample data for the step count chart
const stepData = [
  { name: "Mon", steps: 7500 },
  { name: "Tue", steps: 9200 },
  { name: "Wed", steps: 8100 },
  { name: "Thu", steps: 8700 },
  { name: "Fri", steps: 10200 },
  { name: "Sat", steps: 9800 },
  { name: "Sun", steps: 11000 },
];

export const MetricsBoard = ({ className }: { className: string }) => {
  const { metrics } = useAppState();

  return (
    <section className={`flex flex-col ${className}`}>
      <div className="flex justify-between px-3">
        <h2 className="m-0 text-xl font-semibold text-black">
          General Metrics
        </h2>
        <span className="text-[0.85rem] text-[#2f2760]/60 flex items-center gap-1">
          Last Week
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[#2f2760]/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>

      <div className="grid grid-cols-5 row-3 gap-2">
        <section className="bg-slate-200/70 rounded-3xl backdrop-blur-md  p-2 col-span-2 row-span-2 flex flex-col">
          {/* Mood falling part */}
          <h3 className="justify-start text-black text-xl font-normal ml-3">
            Mood
          </h3>
          <div className="relative w-full h-full">
            <FallingText
              text="focused sad relaxed happy anxious excited tired"
              highlightWords={[
                "focused",
                "sad",
                "relaxed",
                "happy",
                "anxious",
                "excited",
                "tired",
              ]}
              // trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.5}
              fontSize="0.9rem"
              mouseConstraintStiffness={0.7}
            />
          </div>
        </section>
        <section className="bg-slate-200/70 rounded-3xl backdrop-blur-md  p-4 col-span-3 row-span-1 h-32 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="justify-start text-black text-xl font-normal ">
              Sleep
            </h3>
            <div className=" text-center justify-center text-black text-xs font-semibold leading-none whitespace-nowrap text-nowrap flex-nowrap ">
              <span className="bg-green-600 w-2.5 h-2.5 rounded-full inline-block mr-1"></span>
              <span>Synced</span>
            </div>
          </div>
          <div className="self-end ">
            <span className="text-black text-4xl font-semibold ">7 </span>
            <span className="text-black text-xl font-light ">/8 h</span>
          </div>
        </section>
        <section className="bg-slate-200/70 rounded-3xl backdrop-blur-md  p-4 col-span-3 row-span-1 h-32 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="justify-start text-black text-xl font-normal ">
              Water Intake
            </h3>
            <div className=" text-center justify-center text-black text-xs font-semibold leading-none">
              <span className="bg-green-600 w-2.5 h-2.5 rounded-full inline-block mr-1"></span>
              <span>Synced</span>
            </div>
          </div>
          <div className="self-end flex items-end ">
            <span className="text-black text-4xl font-semibold ">7 </span>
            <span className="text-black text-xl font-light flex ">
              /8 <GlassWater className="w-4 h-4 self-center" />
            </span>
          </div>
        </section>
        <section className="bg-slate-200/70 rounded-3xl backdrop-blur-md  p-4 col-span-5 row-span-1 h-32 flex flex-col justify-between">
          <div className="flex gap-6 items-center mb-2">
            <h3 className="justify-start text-black text-xl font-normal ">
              Steps
            </h3>
            <div className=" text-center justify-center text-black text-xs font-semibold leading-none">
              <span className="bg-green-600 w-2.5 h-2.5 rounded-full inline-block mr-1"></span>
              <span>Synced</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="self-end">
              <span className="text-black text-4xl font-semibold">
                {metrics?.steps?.toLocaleString() || "9,800"}
              </span>
              <span className="text-black text-xl font-light ml-1">steps</span>
            </div>
            <div className="w-3/4 h-14">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stepData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                    dy={5}
                  />
                  <YAxis hide domain={[0, 12000]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value) => [`${value} steps`, "Steps"]}
                    labelFormatter={(label) => `${label}`}
                  />
                  <ReferenceLine
                    y={8000}
                    stroke="#10B981"
                    strokeDasharray="3 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="steps"
                    stroke="#6366F1"
                    strokeWidth={3}
                    dot={{
                      stroke: "#6366F1",
                      strokeWidth: 2,
                      fill: "#fff",
                      r: 4,
                    }}
                    activeDot={{
                      stroke: "#6366F1",
                      strokeWidth: 2,
                      fill: "#6366F1",
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default MetricsBoard;
