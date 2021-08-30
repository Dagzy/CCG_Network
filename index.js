'use strict';
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const PORT = 9001;
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const userRoutes = require("./routes/users");
const authRoute = require("./routes/auth");
const cardRoutes = require("./routes/cards");
const deckRoutes = require("./routes/decks");
app.use(helmet());
app.use(morgan("common"));
mongoose.connect(
    // process.env.MONGO_URL ||
    "mongodb://localhost:27017/CCG_Network",
    { useNewURLParser: true, useUnifiedTopology: true },
    err => console.log(`${err ? err : "Connected to MongoDB" }`)
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</hello>");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/decks", deckRoutes)
app.listen(PORT, LEVEL => console.log(`That's over 9000!`));
