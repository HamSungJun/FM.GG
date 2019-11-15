const express = require('express');
const router = express.Router();
const axios = require('axios');
const KEY = require('../../../key/key.js')

router.get("/summonerInfo", (req,res) => {
    
    axios
    .get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(req.query.name)}?api_key=${KEY.API_KEY}`)
    .then(response => {
        console.log(response.data)
        return res.send(response.data).end();
    })
    .catch(error => {
        return res.status(error.response.status).send(error).end();
    })

})

module.exports = router;