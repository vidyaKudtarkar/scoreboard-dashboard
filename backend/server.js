require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Score = require("./models/score");
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "ScoreBoard API Running"
  });
});

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/leaderboard", async (req, res) => {
  try {
    const scores = await Score.find();

    res.json(scores);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching scores"
    });
  }
});

app.post("/leaderboard", async (req, res) => {
  try {
    const newPlayer = new Score(req.body);

    await newPlayer.save();

    res.json({
      message: "Player added",
      data: newPlayer
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving player"
    });
  }
});


app.delete("/leaderboard/:id", async (req, res) => {
  try {

    const playerId = req.params.id;

    await Score.findByIdAndDelete(playerId);

    res.json({
      message: "Player deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error deleting player"
    });
  }
});

app.put("/leaderboard/:id", async (req, res) => {

  try {

    const playerId = req.params.id;

    const updatedPlayer = req.body;

    await Score.findByIdAndUpdate(
      playerId,
      updatedPlayer
    );

    res.json({
      message: "Player updated"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error updating player"
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});