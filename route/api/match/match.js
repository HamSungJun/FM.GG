const express = require('express');
const router = express.Router();
const axios = require('axios');
const KEY = require('../../../key/key.js')
const {Kayn, REGIONS} = require('kayn');
const SETTER = require('../setter/setter');
const MongoMatch = require("../../mongo/match/match");
const kayn = Kayn(KEY.API_KEY)({
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
        delayBeforeRetry: 3000,
        burst: true,
        shouldExitOn403: false,
    },
})

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

        const matchList = await Promise.all(recentMostPickInfo.map(championPlay => {
            return kayn.Matchlist.by.accountID(req.query.encryptedAccountId).query({
                season : req.app.get("seasonInfo")[req.app.get("seasonInfo").length-1].id,
                queue: [420],
                champion: championPlay.championId
            })
        }))

        recentMostPickInfo = recentMostPickInfo.map(championPlay => {
            return Object.assign({},getChampionInfoById(req.app.get("championInfo"),championPlay.championId),{
                playCount : championPlay.playCount,
                isAnalyzing : false,
                analyzedData : null,
                matchList : matchList.find(list => list.matches[0].champion === parseInt(championPlay.championId))
            })
        });

        return res.send(recentMostPickInfo).end();

    } catch (error) {
        console.log(error);
        return res.send(error).end();
    }

})

router.post("/getMostPickInGameData", async (req, res) => {

    console.log(req.body.matchId);
    let initialmatchIdLen = req.body.matchId.length;
    // 1. 데이터 베이스에서 matchId 조회 -> 조회된 데이터 = A
    // 2. 없는 matchId만 모아서 api call -> 결과 데이터 = B -> 데이터 베이스에 저장.
    // 3. A와 B를 취합하여 응답.
    try {
 
        let payload;

        const matchDB = new MongoMatch();
        await matchDB.createConnection();
        
        payload = await Promise.all(req.body.matchId.map(_matchId => (matchDB.getMatchByMatchId2(_matchId))));
        payload = payload.reduce((acc,curr) => {
            if(curr.length > 0){
                acc.push(curr[0]);
            }
            return acc;
        },[]);
                
        matchDB.destroyConnection();

        if(payload.length > 0){
            req.body.matchId = req.body.matchId.filter(matchId => {
                if(!payload.some(match => match.gameId === matchId)){
                    return true;
                }
            });
        }
       
        console.log(`DB hit : ${initialmatchIdLen - req.body.matchId.length}`);

        if(req.body.matchId.length > 0){

            const inGameData = await Promise.all(req.body.matchId.map( gameId => {
                return kayn.Match.get(gameId)
            }));

            payload = payload.concat(inGameData);
            await matchDB.createConnection();
            await matchDB.insertMatch(inGameData);

        } 

        return res.send(payload).end();

    } catch (error) {
        console.log(error);
        return res.send(error).end();
    }

})

module.exports = router;