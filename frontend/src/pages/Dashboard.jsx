import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import PlayerForm from "../components/PlayerForm";
import SearchBar from "../components/SearchBar";
import LeaderboardTable from "../components/LeaderboardTable";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";
import useLeaderboard from "../hooks/useLeaderboard";
import { exportCSV } from "../utils/exportCSV";
import { calculateStats } from "../utils/stats";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
    const leaderboard = useLeaderboard();
   
    const { theme } = useTheme();
    const isDark = theme === "dark";
    
    const {
        loading,
        players,
        filteredPlayers,
    
        username,
        score,
    
        searchTerm,
        sortOption,
    
        editingId,
        editUsername,
        editScore,
    
        playerToDelete,
    
        setUsername,
        setScore,
    
        setSearchTerm,
        setSortOption,
    
        setEditUsername,
        setEditScore,
    
        setPlayerToDelete,
    
        handleAddPlayer,
        handleStartEdit,
        handleUpdatePlayer,
        handleDeletePlayer,
        confirmDeletePlayer,

        paginatedPlayers,
        currentPage,
        setCurrentPage,
        totalPages
      } = leaderboard;
    
      const {
        totalPlayers,
        highestScore,
        lowestScore,
        averageScore
      } = calculateStats(players);
    
      if (loading) {
        return (
          <div className="bg-slate-950 min-h-screen text-white flex items-center justify-center text-4xl">
            Loading...
          </div>
        );
      } 

  return (

    <div className={`min-h-screen p-4 ${
        isDark
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}>

      <div className="max-w-7xl mx-auto">

      <Navbar exportCSV={() => exportCSV(filteredPlayers)}/>

        <StatsCards totalPlayers={totalPlayers} highestScore={highestScore} lowestScore={lowestScore} averageScore={averageScore} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        <PlayerForm username={username} setUsername={setUsername} score={score} setScore={setScore} handleAddPlayer={handleAddPlayer}/>

          <div className="lg:col-span-2">

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortOption={sortOption} setSortOption={setSortOption}/>

            <LeaderboardTable players={paginatedPlayers} searchTerm={searchTerm} currentPage={currentPage} handleDeletePlayer={handleDeletePlayer} editingId={editingId} editUsername={editUsername} setEditUsername={setEditUsername}
editScore={editScore} setEditScore={setEditScore} handleStartEdit={handleStartEdit} handleUpdatePlayer={handleUpdatePlayer} />  

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          </div>

        </div>

      </div>

      <DeleteModal isOpen={!!playerToDelete} onClose={() => setPlayerToDelete(null)} onConfirm={confirmDeletePlayer} />
    </div>
  );
}