export const MoodWidget = () => {
  return (
    <section className="relative bg-gradient-to-b from-purple-400/40 to-pink-300/50 rounded-[40px] p-8 text-white min-h-[420px] flex flex-col justify-between overflow-hidden">
      <div className="relative flex-1 flex items-center justify-center">
        {/* Primary bubble */}
        <div className="absolute w-[260px] h-[260px] rounded-full animate-float bg-gradient-radial from-white/90 via-purple-300/60 to-purple-500/30" />

        {/* Secondary bubble */}
        <div className="absolute w-[180px] h-[180px] rounded-full animate-float-reverse bg-gradient-radial from-white/80 via-pink-300/60 to-pink-400/25" />

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
