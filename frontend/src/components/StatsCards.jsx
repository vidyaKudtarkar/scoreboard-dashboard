import { useTheme } from "../context/ThemeContext";

export default function StatsCards({totalPlayers, highestScore, lowestScore, averageScore}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

        const stats = [
            {
              title: "Total Players",
              value: totalPlayers
            },
            {
              title: "Highest Score",
              value: highestScore
            },
            {
              title: "Lowest Score",
              value: lowestScore
            },
            {
              title: "Average Score",
              value: averageScore
            }
          ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-center">
  
        {stats.map((item, index) => (
  
          <div key={index} className={`border rounded-3xl p-6 shadow-xl ${ 
            isDark
            ? "bg-slate-900 border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-900"}`}>
  
            <p className="text-slate-400">
              {item.title}
            </p>
  
            <h2 className="text-4xl font-bold mt-3">
              {item.value}
            </h2>
  
          </div>
        ))}
  
      </div>
    );
  }