const express = require('express');
const router = express.Router();
const axios = require('axios');
const KEY = require('../../../key/key.js')

router.get("/", (req, res) => {

    axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.query.encryptedSummonerId}?api_key=${KEY}`)
    .then(response => {
        console.log(response.data);
        return res.send(response.data).end();
    })
    .catch(error => {
        return res.status(error.response.status).send(error).end();
    })

})

module.exports = router;