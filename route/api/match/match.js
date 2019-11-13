const express = require('express');
const router = express.Router();
const axios = require('axios');
const KEY = require('../../../key/key.js')
const {Kayn, REGIONS} = require('kayn');
const kayn = Kayn(KEY)({
    region : REGIONS.KOREA,
    apiURLPrefix : 'https://kr.api.riotgames.com',
    locale : 'ko_KR',
    debugOptions : {
        isEnabled : true,
        showKey: true
    },
    requestOptions : {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 3,
        delayBeforeRetry: 1000,
        burst: false,
        shouldExitOn403: false
    },
})
const SETTER = require('../setter/setter');

const getMostPlayedChampion = (matchlist) => {

    if(matchlist.length > 0){

        let playHistory = matchlist.reduce((acc, curr) => {
            if(curr["champion"] in acc){
                acc[curr["champion"]] += 1; 
            } else {
                acc[curr["champion"]] = 1;
            }
            return acc;
        },{})

        let mostPlayedIds = [];
        Object.keys(playHistory).forEach(championId => {
            mostPlayedIds.push({
                championId : championId,
                playCount : playHistory[championId]
            })
        })

        mostPlayedIds.sort((a,b) => {
            return b.playCount - a.playCount
        })
        
        return mostPlayedIds.slice(0,mostPlayedIds.length >= SETTER.MAX_LEN_MOST_CHAMPION_LIST ? SETTER.MAX_LEN_MOST_CHAMPION_LIST : mostPlayedIds.length);

    }

    return false;

}

const getChampionInfoById = (championInfo,championId) => {
    
    const deleteKeys = ["version", "blurb", "stats", "partype", "info"];
    let answer;

    for (const champion in championInfo["data"]) {
       if(championInfo["data"][champion]["key"] === championId){
           
            answer = championInfo["data"][champion];
            deleteKeys.forEach(delKey => {
                delete answer[delKey];
            })
            
            return answer;

       }
    }
    
}  

router.get("/getRecentSoloRankMostPick", async (req, res) => {

    try{
     
        const recent100Games = await kayn.Matchlist.by.accountID(req.query.encryptedAccountId).query({
            season : req.app.get("seasonInfo")[req.app.get("seasonInfo").length-1].id,
            queue: [420]
        })
        
        let recentMostPickInfo = getMostPlayedChampion(recent100Games.matches);
        // console.log(recentMostPickInfo)
        recentMostPickInfo = recentMostPickInfo.map(championPlay => {
            return Object.assign({},getChampionInfoById(req.app.get("championInfo"),championPlay.championId),{
                playCount : championPlay.playCount,
                isAnalyzing : false,
                analyzedData : null
            })
        });

        // console.log(recentMostPickInfo);
       
        return res.send(recentMostPickInfo).end();

    } catch (error) {
        console.log(error);
        return res.send(error).end();
    }

})

router.get("/getMostPickInGameData", async (req, res) => {

    try {

        const inGameIds = await kayn.Matchlist.by.accountID(req.query.encryptedAccountId).query({
            season : req.app.get("seasonInfo")[req.app.get("seasonInfo").length-1].id,
            queue: [420],
            champion: req.query.championId
        });

        const inGameData = await Promise.all(inGameIds.matches.map(game => {
            return kayn.Match.get(game.gameId).query({});
        }));
        
        return res.send(inGameData).end();

    } catch (error) {
        console.log(error);
        return res.send(error).end();
    }

})

module.exports = router;