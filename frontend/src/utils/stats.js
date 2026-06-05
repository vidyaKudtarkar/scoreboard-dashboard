export const calculateStats = (players) => {

    const totalPlayers = players.length;
  
    const highestScore =
      totalPlayers > 0
        ? Math.max(...players.map(p => p.score))
        : 0;
  
    const lowestScore =
      totalPlayers > 0
        ? Math.min(...players.map(p => p.score))
        : 0;
  
    const averageScore =
      totalPlayers > 0
        ? Math.round(
            players.reduce(
              (sum, p) => sum + p.score,
              0
            ) / totalPlayers
          )
        : 0;
  
    return {
      totalPlayers,
      highestScore,
      lowestScore,
      averageScore
    };
  };