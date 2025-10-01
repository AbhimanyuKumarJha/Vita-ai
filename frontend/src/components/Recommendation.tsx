import RecommendationCard from "./RecommendationCard";
const Recommendation = ({ className }: { className?: string }) => {
  const data = [
    {
      title: "Mood = Sad",
      desc: "Here is the playlist to uplift your mood.",
      arrowMessage: "Play Now",
      className:
        "bg-gradient-to-b from-pink-200 to-red-200 rounded-3xl backdrop-blur-[2px]",
    },
    {
      title: "Hydration reminder",
      desc: "You typically forget to drink water after lunch. Set a reminder?",
      arrowMessage: "Set reminder",
      className: "bg-gradient-to-l from-purple-200 to-violet-200 ",
    },
    {
      title: "Share with your buddy",
      desc: "Wanna share your active streak with your friends?",
      arrowMessage: "Try now",
      className: "bg-gradient-to-l from-violet-300 to-violet-100",
    },
    {
      title: "Feeling inspired?",
      desc: "Let’s turn you thoughts into your favorite hobby.. Poetry <3",
      arrowMessage: "Get Started",
      className: "bg-gradient-to-l from-yellow-100 to-lime-50 ",
    },
  ];
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 gap-y-4 max-h-[360px] ${className}`}
    >
      {data.map((item, index) => (
        <RecommendationCard
          key={index}
          className={item.className}
          title={item.title}
          desc={item.desc}
          arrowMessage={item.arrowMessage}
        />
      ))}
    </div>
  );
};

export default Recommendation;
