const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const summonerApiRouter = require('./route/api/summoner/summoner');

app.use(cors());
app.use(express.static(__dirname+'/build'));

app.use("/api/summoner/",summonerApiRouter);

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"build","index.html"));
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})