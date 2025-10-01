import { FiBell } from "react-icons/fi";
import { useRef } from "react";
import ButtonAnimatedGradient from "./ui/button";
import SearchHoverRight from "./ui/searchbar";

export const TopBar = ({
  setModalOpen,
}: {
  setModalOpen: (open: boolean) => void;
}) => {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = async () => {
    try {
      const { gsap } = await import("gsap");
      const el = buttonRef.current;
      if (!el) return; // Ensure the target exists
      gsap.killTweensOf(el);
      const tl = gsap.timeline();
      tl.to(el, { scale: 1.1, duration: 0.12, ease: "power2.out" })
        .to(el, { rotation: 10, duration: 0.06 })
        .to(el, { rotation: -10, duration: 0.06 })
        .to(el, { rotation: 10, duration: 0.06 })
        .to(el, { rotation: 0, duration: 0.06 });
    } catch (error) {
      console.error("GSAP animation error on mouse enter:", error);
    }
  };

  const handleMouseLeave = async () => {
    try {
      const { gsap } = await import("gsap");
      const el = buttonRef.current;
      if (!el) return; // Ensure the target exists
      gsap.to(el, {
        scale: 1,
        rotation: 0,
        duration: 0.18,
        ease: "power2.out",
      });
    } catch (error) {
      console.error("GSAP animation error on mouse leave:", error);
    }
  };

  // const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-6 px-8 bg-violet-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-lg">
      <div className="flex items-center gap-5">
        <span className="text-[28px] font-bold text-[#3f2d8a] tracking-wider">
          Vita
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        {/* <ButtonHoverRight /> */}
        <SearchHoverRight />
        {/* <div className="flex items-center gap-2.5 py-3 px-4.5 w-[360px] rounded-[24px] bg-indigo-100/70 text-indigo-600">
          <FiSearch />
          <input
            placeholder="What would you like to improve today?"
            aria-label="Search"
            className="border-none outline-none bg-transparent text-[0.95rem] flex-1 text-[#463e6f] placeholder-[#463e6f]/60"
          />
        </div> */}
        <button
          ref={buttonRef}
          className="border-none bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#c0c7ff] to-[#4c64ff] text-white w-11 h-11 rounded-full grid place-items-center text-[1.15rem] cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FiBell />
        </button>

        {/* <button className="border-none py-3 px-5 rounded-[24px] bg-gradient-to-br from-indigo-500 to-purple-400 text-white font-normal cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25">
          Online Consultation
        </button> */}

        <ButtonAnimatedGradient onClick={() => setModalOpen(true)}>
          Online Consultation
        </ButtonAnimatedGradient>
        <span className="text-sm text-black py-2 px-4 font-semibold font-poppins leading-none max-sm:hidden">
          {today}
        </span>
        {/* <div className="flex items-center gap-3 bg-white/80 py-2.5 px-4 rounded-[26px] text-[#463e6f]">
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt="Profile avatar"
            className="w-9 h-9 rounded-full"
          />
          <div>
            <span className="block text-[0.95rem] font-semibold">
              Natasha Y
            </span>
            <span className="text-[0.75rem] text-[#463e6f]/60">
              Premium member
            </span>
          </div>
          <FiChevronDown />
        </div> */}
      </div>
    </header>
  );
};

export default TopBar;
