import { useTheme } from "../context/ThemeContext";

export default function PlayerForm({ username, setUsername, score, setScore, handleAddPlayer })
{
  const { theme } = useTheme();
  const isDark = theme === "dark";

    return (
  
      <div className={`rounded-3xl p-6 ${ 
        isDark
        ? "bg-slate-900 border-slate-800 text-white"
        : "bg-white border-slate-200 text-slate-900"}`}>
  
        <h2 className="text-2xl font-semibold mb-6">
          Add New Player
        </h2>
  
        <div className="space-y-4">
  
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value) }
            className={`w-full rounded-xl px-4 py-3 border outline-none ${
              isDark
                ? "bg-slate-950 border-slate-700 text-white"
                : "bg-slate-50 border-slate-300 text-slate-900"
            }`}/>
  
          <input type="number" placeholder="Score" value={score} onChange={(e) => setScore(e.target.value) }
          className={`w-full rounded-xl px-4 py-3 border outline-none ${
            isDark
              ? "bg-slate-950 border-slate-700 text-white"
              : "bg-slate-50 border-slate-300 text-slate-900"
          }`}/>
  
          <button onClick={handleAddPlayer} className={`w-full py-3 rounded-xl  border font-semibold ${
            isDark
              ? "bg-slate-950 border-slate-700 text-white"
              : "bg-slate-50 border-slate-300 text-slate-900"}`}>
            Add Player
          </button>

        </div>
  
      </div>
    );
  }