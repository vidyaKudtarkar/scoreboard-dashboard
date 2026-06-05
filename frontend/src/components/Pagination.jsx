import { useTheme } from "../context/ThemeContext";

export default function Pagination({ currentPage, totalPages, setCurrentPage}) 
{
  const { theme } = useTheme();
  const isDark = theme === "dark";

    return (
      <div className="flex justify-center gap-2 mt-6">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}
           className={`px-4 py-2  rounded-lg ${ isDark ? "bg-slate-800 text-blue-200" : "bg-slate-300 text-blue-700" }`}>
          Prev
        </button>
  
        {[...Array(totalPages)].map((_, index) => (
  
          <button key={index} onClick={() => setCurrentPage(index + 1)} className={`px-4 py-2 rounded-lg ${
            currentPage === index + 1
            ? "bg-blue-600 text-white"
            : isDark
              ? "bg-slate-800 text-blue-200"
              : "bg-slate-300 text-blue-700" }`} >
            {index + 1}
          </button>
  
        ))}
  
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 rounded-lg ${ isDark ? "bg-slate-800 text-blue-200" : "bg-slate-300 text-blue-700" }`}>
          Next
        </button>
      </div>
    );
  }