import { useTheme } from "../context/ThemeContext";

export default function SearchBar({searchTerm,setSearchTerm,sortOption,setSortOption}) 
{
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
  
      <div className="flex flex-col md:flex-row gap-4 mt-6">
  
        <input type="text" placeholder="Search player" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 rounded-xl px-4 py-3 outline-none border ${
             isDark 
             ? "bg-slate-950 border-slate-700 text-white"
             : "bg-slate-50 border-slate-300 text-slate-900"
           }`}/>
  
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className={`rounded-xl px-4 py-3 border outline-none ${
            isDark 
            ? "bg-slate-950 border-slate-700 text-white"
            : "bg-slate-50 border-slate-300 text-slate-900"
        }`}>
          <option value="highest">Highest Score</option>
          <option value="lowest">Lowest Score</option>
  
        </select>
  
      </div>
    );
}