import { useTheme } from "../context/ThemeContext";

export default function Navbar({exportCSV}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

    return (
      <div>
         <div className="flex justify-end py-3">
            <button onClick={toggleTheme} className={`px-4 py-2 rounded-xl border transition-all ${ 
              isDark
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-slate-300 text-slate-900"}`}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
      
            <div>
              <h1 className="text-4xl font-bold">
                Leaderboard Dashboard
              </h1>
      
              <p className="text-slate-400 mt-2">
                Full Stack CRUD Application
              </p>
            </div>
      
            <button onClick={exportCSV} className={`px-5 py-3 rounded-xl border hover:scale-105 transition-all
            ${ isDark
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-slate-300 text-slate-900"}`}>
              Export
            </button>
      
          </div>
      </div>
    );
  }