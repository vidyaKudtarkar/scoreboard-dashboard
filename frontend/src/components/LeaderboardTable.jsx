import { useTheme } from "../context/ThemeContext";

export default function LeaderboardTable({players, searchTerm, handleDeletePlayer, editingId, editUsername, setEditUsername, editScore, setEditScore, handleStartEdit, handleUpdatePlayer})
 {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const getRankDisplay = (rank) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
        return `#${rank}`;
      };
      
   return (
        <div className={`rounded-3xl p-4 mt-4 ${ 
            isDark
            ? "bg-slate-900 border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-900"}`}>

            <h2 className="text-2xl font-semibold mb-6"> Top Players</h2>
    
            <div className="space-y-4">
                {players.length === 0 ? (

                    <div className="text-center py-16">

                    <div className="text-6xl mb-4">
                    {searchTerm ? "🔍" : "🏆"}
                    </div>

                    <h3 className="text-2xl font-bold mb-2">
                    {searchTerm
                        ? `No player matches "${searchTerm}"`
                        : "Add your first player to begin."}
                    </h3>

                    </div>
                ) : (  
                players.map((player) => {
                    return (
                        <div key={player._id} className={`flex items-center justify-between border rounded-2xl p-2 ${
                            isDark
                                ? "bg-slate-950 border-slate-800 text-white"
                                : "bg-slate-50 border-slate-300 text-slate-900"
                        }`}>
                            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                              {getRankDisplay(player.rank)}
                            </div>
                        
                            <div className="flex flex-col justify-center items-center sm:flex-row gap-3 flex-1 min-w-0">
                                {editingId === player._id ? (

                                    <div className="flex flex-col justify-center items-center sm:flex-row  gap-3 flex-1 min-w-0">
                                       <input type="text" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} 
                                       className={`w-40 sm:w-auto  border rounded-xl px-4 py-2 outline-none text-center ${
                                            isDark
                                            ? "bg-slate-900 border-slate-700 text-white"
                                            : "bg-white border-slate-300 text-slate-900"
                                        }`}/>

                                        <input type="number" value={editScore} onChange={(e) => setEditScore(e.target.value)}
                                        className={`w-16 sm:w-auto border rounded-xl px-4 py-2 outline-none text-center ${
                                            isDark
                                            ? "bg-slate-900 border-slate-700 text-white"
                                            : "bg-white border-slate-300 text-slate-900"
                                        }`}/>            
                                    </div>

                                ) : (

                                <div className="text-center">
                                    <h3 className="font-semibold">
                                        {player.username}
                                    </h3>

                                    <p className="text-slate-400">
                                        Score: {player.score}
                                    </p>
                                </div>

                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">

                                {editingId === player._id ? (

                                    <button onClick={handleUpdatePlayer} className={`bg-green-500/20 px-4 py-2 rounded-xl hover:bg-green-500/30 transition-all
                                    ${ isDark  ? "text-blue-300" : "text-blue-700"}`}>
                                    Save
                                    </button>
                                ) : (

                                    <button onClick={() => handleStartEdit(player)} className={`bg-blue-500/20 px-4 py-2 rounded-xl hover:bg-blue-500/30 transition-all ${
                                    isDark  ? "text-blue-300" : "text-blue-700"}`}>
                                    Edit
                                    </button>
                                )}

                                <button onClick={() => handleDeletePlayer(player._id)} className={`bg-blue-500/20 px-4 py-2 rounded-xl hover:bg-blue-500/30 transition-all ${
                                   isDark  ? "text-red-300" : "text-red-700"}`}> 
                                   Delete
                                </button>

                            </div>
                        </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}