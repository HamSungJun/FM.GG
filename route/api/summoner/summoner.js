const express = require('express');
const router = express.Router();
const axios = require('axios');
const KEY = require('../../../key/key.js')

router.get("/summonerInfo", (req,res) => {
    
    axios
    .get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(req.query.name)}?api_key=${KEY}`)
    .then(response => {
        res.json(response.data).end();
    })
    .catch(error => {
        console.log(err);
        return res.status(500).send(err);
    })

})

module.exports = router;