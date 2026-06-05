import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { fetchPlayers, addPlayer, deletePlayer, updatePlayer } from "../services/api";

export default function useLeaderboard() {
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState("");
    const [score, setScore] = useState("");
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editUsername, setEditUsername] = useState("");
    const [editScore, setEditScore] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("highest");
    const [playerToDelete, setPlayerToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const playersPerPage = 5;

    const loadPlayers = async () => {

        try {
    
        const data = await fetchPlayers();
    
        setPlayers(data);
    
        } catch (error) {
    
        console.log(error);
    
        } finally {
    
        setLoading(false);
        }
    };

    useEffect(() => {
        loadPlayers();
    }, []);

    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, sortOption]);


    const handleAddPlayer = async () => {

        if (!username || !score) {
          return;
        }
      
        try {
      
          const newPlayer = {
            username,
            score: Number(score)
          };
      
          await addPlayer(newPlayer);
          toast.success("Player added successfully");

          setUsername("");
          setScore("");
      
          loadPlayers();
      
        } catch (error) {
      
          console.log(error);
          toast.error("Something went wrong");
        }
    };

    const handleStartEdit = (player) => {
        setEditingId(player._id);
        setEditUsername(player.username);
        setEditScore(player.score);
    };

    const handleUpdatePlayer = async () => {

      try {
    
        const updatedData = {
          username: editUsername,
          score: Number(editScore)
        };
    
        await updatePlayer( editingId, updatedData);

        toast.success("Player updated successfully");
        setEditingId(null);
    
        loadPlayers();
    
      } catch (error) {
    
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    const handleDeletePlayer = (id) => {
      setPlayerToDelete(id);
    };
      
    const confirmDeletePlayer = async () => {

        try {
      
          await deletePlayer(playerToDelete);
      
          toast.success("Player deleted successfully");
      
          setPlayerToDelete(null);
      
          loadPlayers();
      
        } catch (error) {
      
          console.log(error);
      
          toast.error("Something went wrong");
        }
    };


    const rankedPlayers = [...players]
    .sort((a, b) => b.score - a.score)
    .map((player, index) => ({
      ...player,
      rank: index + 1
    }));

    const searchedPlayers = rankedPlayers.filter(
      player =>
        player.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

      const filteredPlayers = [...searchedPlayers].sort((a, b) => {

          if (sortOption === "highest") {
            return b.score - a.score;
          }

          return a.score - b.score;
        }
      );

        const totalPages = Math.ceil( filteredPlayers.length / playersPerPage );
        const startIndex = (currentPage - 1) * playersPerPage;
        const paginatedPlayers =
        filteredPlayers.slice(
          startIndex,
          startIndex + playersPerPage
        );
       
      return {
        // states
        players,
        filteredPlayers,
        loading,
        username,
        score,
        searchTerm,
        sortOption,
        editingId,
        editUsername,
        editScore,
        playerToDelete,
    
        // setters
        setUsername,
        setScore,
        setSearchTerm,
        setSortOption,
        setEditUsername,
        setEditScore,
        setPlayerToDelete,
    
        // handlers
        handleAddPlayer,
        handleDeletePlayer,
        handleStartEdit,
        handleUpdatePlayer,
        confirmDeletePlayer,

        // pagination
        paginatedPlayers,
        currentPage,
        setCurrentPage,

        totalPages,
      };
}

