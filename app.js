const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const summonerApiRouter = require('./route/api/summoner/summoner');
const lolStatusApiRouter = require('./route/api/lol-status/lol-status');
const leagueApiRouter = require('./route/api/league/league')

app.use(cors());
app.use(express.static(__dirname+'/build'));

app.use("/api/summoner",summonerApiRouter);
app.use("/api/lolStatus",lolStatusApiRouter);
app.use("/api/league",leagueApiRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"build","index.html"));
})

app.listen(9000, () => {
    console.log('Example app listening on port 9000!');
})