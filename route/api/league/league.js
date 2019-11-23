const express = require('express');
const router = express.Router();
const kayn = require('../kayn/kayn.js');

router.get("/", async (req, res) => {

    try{
        const leagueInfo = await kayn.League.Entries.by.summonerID(req.query.encryptedSummonerId);
        res.send(leagueInfo).end();
    } catch (error) {
        console.log(error);
        res.status(error.statusCode).json({
            status : error.statusCode,
            mesg : "소환사의 리그정보를 불러오는 중에 문제가 발생했습니다."
        }).end();
    }

})

module.exports = router;