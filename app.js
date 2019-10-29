const express = require('express');
const app = express();
const path = require('path');
const summonerApiRouter = require('./route/api/summoner/summoner');

app.use(express.static(__dirname+'/build'));

app.use("/api/summoner/",summonerApiRouter);

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"build","index.html"));
})

app.listen(9000, () => {
    console.log('Example app listening on port 80!');
})