import { ArrowRight } from "lucide-react";
import React from "react";

const RecommendationCard = ({
  className,
  title,
  desc,
  arrowMessage,
}: {
  className: string;
  title: string;
  desc: string;
  arrowMessage: string;
}) => {
  return (
    <div
      className={`rounded-3xl bg-white p-6  shadow- flex flex-col gap-2 max-h-40 ${className}`}
    >
      {/* Card content goes here */}
      <div className="self-stretch h-6 justify-start text-black text-base font-medium ">
        {title}
      </div>
      <div className="w-56 h-10 justify-start text-neutral-500 text-xs font-normal text-wrap">
        {desc}
      </div>
      <button className="self-stretch justify-start text-black text-sm font-normal font-['Inter'] leading-7 flex items-center gap-1 cursor-pointer ">
        {arrowMessage}
        <ArrowRight className="w-3 h-3" />
      </button>
      {/* <ButtonCreativeRight title="Let's do it" /> */}
    </div>
  );
};

// function ButtonCreativeRight({ title }: { title: string }) {
//   return (
//     <>
//       <div className="group relative cursor-pointer p-2 w-32 border bg-white rounded-full overflow-hidden text-black text-center font-semibold">
//         <span className="translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block">
//           {title}
//         </span>
//         <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300">
//           <span>{title}</span>
//           <ArrowRight />
//         </div>
//         <div className="absolute top-[40%] left-[20%] h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-black scale-[1] dark:group-hover:bg-[#e7cb6e] group-hover:bg-[#263381] group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] "></div>
//       </div>
//     </>
//   );
// }

export default RecommendationCard;
