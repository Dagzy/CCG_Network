const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const PORT = 9001;
const app = express();
dotenv.config();
mongoose.connect(dotenv.MONGO_URL ||"mongodb://localhost:27017/CCG_Network", (err, db)=>{
    console.log(err, db); 
})
app.get("/", (req, res) => {
    res.send("<h1>Hello!</hello>");
});

app.listen(PORT, LEVEL => {
    console.log(`That's over 9000!`);
});
