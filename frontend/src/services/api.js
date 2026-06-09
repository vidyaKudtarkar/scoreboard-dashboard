const API_URL = "https://scoreboard-api-aw31.onrender.com/leaderboard";

export const fetchPlayers = async () => {

  const response = await fetch(API_URL);

  return response.json();
};

export const addPlayer = async (playerData) => {

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(playerData)
  });

  return response.json();
};

export const deletePlayer = async (id) => {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
};

export const updatePlayer = async (
    id,
    updatedData
  ) => {
  
    const response = await fetch(
  
      `${API_URL}/${id}`,
  
      {
  
        method: "PUT",
  
        headers: {
          "Content-Type": "application/json"
        },
  
        body: JSON.stringify(updatedData)
      }
    );
  
    return response.json();
  };