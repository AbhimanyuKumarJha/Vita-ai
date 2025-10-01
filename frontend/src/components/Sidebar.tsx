import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  CircleQuestionMark,
  Component,
  HeartPulse,
  History,
  LogOut,
  Settings,
} from "lucide-react";

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
      className="w-20 h-[95vh] bg-slate-200 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-slate-200 overflow-hidden opacity-0 fixed flex flex-col items-center pt-6 justify-between "
    >
      <div className="flex flex-col items-center gap-7 w-full">
        <img
          className="w-11 h-11  opacity-80 rounded-[90px] border border-slate-400 animate-in"
          src="https://placehold.co/44x44"
          alt="User avatar"
        />

        <div className="w-11 h-5 text-center justify-center text-slate-400 text-xs font-semibold leading-none animate-in">
          MAIN
        </div>
        <Component className="w-6 h-6  animate-in cursor-pointer" />
        <HeartPulse className="w-6 h-6  animate-in cursor-pointer" />
        <History className="w-6 h-6  animate-in cursor-pointer" />
      </div>

      <div className="mx-auto  w-full">
        <div className="w-full h-5 text-center justify-center text-slate-400 text-xs font-semibold leading-none animate-in mb-5">
          EXTRA
        </div>
        <CircleQuestionMark className="w-6 h-6  animate-in mb-7 mx-auto cursor-pointer" />
        <Settings className="w-6 h-6  animate-in my-7 mx-auto cursor-pointer" />
      </div>

      <LogOut className="w-8 h-8 mb-6 text-red-500 hover:text-red-600 transition-colors cursor-pointer animate-in" />
      {/* <Settings className="w-6 h-6  animate-in" /> */}

      <div
        ref={activeIndicatorRef}
        className="w-3 h-0 left-[72px] top-[147px] absolute bg-purple-400 rounded-xl opacity-0"
      />
    </div>
  );
};

export default Sidebar;
