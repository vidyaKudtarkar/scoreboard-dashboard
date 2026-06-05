export const exportCSV = (players) => {

    const headers = ["Username", "Score"];
  
    const rows = players.map(player => [
      player.username,
      player.score
    ]);
  
    const csvContent = [
      headers,
      ...rows
    ]
      .map(row => row.join(","))
      .join("\n");
  
    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;"
      }
    );
  
    const url =
      window.URL.createObjectURL(blob);
  
    const link =
      document.createElement("a");
  
    link.href = url;
  
    link.download = "leaderboard.csv";
  
    link.click();
  
    window.URL.revokeObjectURL(url);
  };