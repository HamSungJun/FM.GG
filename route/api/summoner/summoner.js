const express = require('express');
const router = express.Router();
const kayn = require('../kayn/kayn.js');

router.get("/summonerInfo", async (req,res) => {
    
    try{
        const summonerInfo = await kayn.Summoner.by.name(req.query.name)
        console.log(summonerInfo);
        res.send(summonerInfo).end();
    } catch (error) {
        res.status(error.statusCode).json({
            status : error.statusCode,
            mesg : "소환사 정보 찾기에 실패했어요. 다시 시도해주세요"
        }).end();
    }

})

module.exports = router;