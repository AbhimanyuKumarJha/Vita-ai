import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const elements = sidebar?.querySelectorAll(".animate-in");

    if (elements) {
      gsap.set(elements, { autoAlpha: 0, y: 20 });
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(sidebar, { autoAlpha: 1, duration: 0.4 })
      .to(elements || [], {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
      })
      .to(
        activeIndicatorRef.current,
        {
          autoAlpha: 1,
          height: "40px",
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="w-20 h-[954px] relative bg-slate-200 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-slate-200 overflow-hidden opacity-0"
    >
      <img
        className="w-11 h-11 left-[17px] top-[31px] absolute opacity-80 rounded-[90px] border border-slate-400 animate-in"
        src="https://placehold.co/44x44"
        alt="User avatar"
      />

      <div className="w-11 h-5 left-[18px] top-[100px] absolute text-center justify-center text-slate-400 text-xs font-semibold font-['Poppins'] leading-none animate-in">
        MAIN
      </div>

      <div className="w-9 h-9 left-[18px] top-[146px] absolute animate-in">
        <div className="w-9 h-9 left-0 top-0 absolute bg-black rounded-[20px] border border-white" />
        <div className="w-6 h-6 left-[7px] top-[7px] absolute">
          <div className="w-5 h-5 left-[2.22px] top-[2.22px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
        </div>
      </div>

      <div className="w-3.5 h-2.5 left-[10px] top-[175px] absolute animate-in" />

      <div className="w-11 h-11 left-[18px] top-[199px] absolute animate-in">
        <div className="w-5 h-5 left-[8px] top-[12px] absolute">
          <div className="w-5 h-5 left-[0.01px] top-[1.37px] absolute bg-black" />
        </div>
        <div className="w-1.5 h-1.5 left-[33px] top-[1px] absolute bg-red-700 rounded-full" />
      </div>

      <div className="w-6 h-6 left-[25px] top-[253px] absolute animate-in">
        <div className="w-4 h-4 left-[3px] top-[3px] absolute bg-black" />
      </div>

      <div className="w-11 h-5 left-[12px] top-[517px] absolute text-center justify-center text-slate-400 text-xs font-semibold font-['Poppins'] leading-none animate-in">
        EXTRA
      </div>

      <div className="w-6 h-6 left-[23px] top-[606px] absolute animate-in">
        <div className="w-5 h-5 left-[1.95px] top-[2px] absolute bg-black" />
      </div>

      <div className="left-[18px] top-[558px] absolute inline-flex justify-start items-center gap-3.5 animate-in">
        <div className="w-8 text-center justify-center text-black text-3xl font-normal font-['Poppins'] leading-loose tracking-tight">
          ?
        </div>
      </div>

      <div className="w-9 h-9 left-[22px] top-[889px] absolute animate-in">
        <div className="w-7 h-7 left-[2.92px] top-[4.38px] absolute bg-black" />
      </div>

      <div
        ref={activeIndicatorRef}
        className="w-3 h-0 left-[72px] top-[147px] absolute bg-purple-400 rounded-xl opacity-0"
      />
    </div>
  );
};

export default Sidebar;

// //what i Want from this file
// <div className="w-20 h-[954px] relative bg-slate-200 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-2 outline-offset-[-2px] outline-slate-200 overflow-hidden">
//     <div className="w-6 h-6 left-[25px] top-[253px] absolute">
//         <div className="w-4 h-4 left-[3px] top-[3px] absolute bg-black" />
//     </div>
//     <div className="w-11 h-11 left-[18px] top-[199px] absolute">
//         <div className="w-5 h-5 left-[8px] top-[12px] absolute">
//             <div className="w-5 h-5 left-[0.01px] top-[1.37px] absolute bg-black" />
//         </div>
//         <div className="w-1.5 h-1.5 left-[33px] top-[1px] absolute bg-red-700 rounded-full" />
//     </div>
//     <div className="w-9 h-9 left-[18px] top-[146px] absolute">
//         <div className="w-9 h-9 left-0 top-0 absolute bg-black rounded-[20px] border border-white" />
//         <div className="w-6 h-6 left-[7px] top-[7px] absolute">
//             <div className="w-5 h-5 left-[2.22px] top-[2.22px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
//         </div>
//     </div>
//     <div className="w-3.5 h-2.5 left-[10px] top-[175px] absolute" />
//     <div className="w-11 h-5 left-[12px] top-[517px] absolute text-center justify-center text-slate-400 text-xs font-semibold font-['Poppins'] leading-none">EXTRA</div>
//     <div className="w-11 h-5 left-[18px] top-[100px] absolute text-center justify-center text-slate-400 text-xs font-semibold font-['Poppins'] leading-none">MAIN</div>
//     <img className="w-11 h-11 left-[17px] top-[31px] absolute opacity-80 rounded-[90px] border border-slate-400" src="https://placehold.co/44x44" />
//     <div className="w-6 h-6 left-[23px] top-[606px] absolute">
//         <div className="w-5 h-5 left-[1.95px] top-[2px] absolute bg-black" />
//     </div>
//     <div className="w-9 h-9 left-[22px] top-[889px] absolute">
//         <div className="w-7 h-7 left-[2.92px] top-[4.38px] absolute bg-black" />
//     </div>
//     <div className="w-3 h-10 left-[72px] top-[147px] absolute bg-purple-400 rounded-xl" />
//     <div className="left-[18px] top-[558px] absolute inline-flex justify-start items-center gap-3.5">
//         <div className="w-8 text-center justify-center text-black text-3xl font-normal font-['Poppins'] leading-loose tracking-tight">?</div>
//     </div>
// </div>
