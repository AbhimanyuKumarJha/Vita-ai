export const MoodWidget = ({ className }: { className: string }) => {
  return (
    <section
      className={`relative  rounded-[40px] p-8 text-white min-h-[420px] flex flex-col justify-between overflow-hidden bg-[url('/tree.png')] bg-no-repeat bg-center bg-contain ${className}`}
    >
      <div className="relative flex-1 flex items-center justify-center ">
        {/* <img src="/tree.png" alt="Tree" className=" absolute" /> */}
        <button
          className="relative mt-[220px] px-5 py-3 rounded-full border-none text-[0.95rem] text-purple-900 bg-white/85 cursor-pointer shadow-[0_12px_24px_rgba(47,39,96,0.2)] hover:bg-white/90 transition-colors"
          aria-label="Tell Vita how you feel"
        >
          Tell Vita how do you feel?
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <span className="bg-white/20 rounded-[18px] px-3.5 py-2 text-[0.85rem] backdrop-blur-sm">
          How was your sleep?
        </span>
        <span className="bg-white/20 rounded-[18px] px-3.5 py-2 text-[0.85rem] backdrop-blur-sm">
          Did you talk to your mom?
        </span>
        <span className="bg-white/20 rounded-[18px] px-3.5 py-2 text-[0.85rem] backdrop-blur-sm">
          What's your mood?
        </span>
      </div>
    </section>
  );
};

export default MoodWidget;
