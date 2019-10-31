const express = require('express');
const router = express.Router();
const axios = require('axios');
const KEY = require('../../../key/key.js')

router.get("/", (req, res) => {

    axios.
    get(`https://kr.api.riotgames.com/lol/status/v3/shard-data?api_key=${KEY}`)
    .then(response => {
        console.log(response.data.services.slice(0,3));
        return res.send(response.data.services.slice(0,3)).end();
    })
    .catch(error => {
        return res.status(error.response.status).send(error).end();
    })

})

module.exports = router;