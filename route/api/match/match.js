const express = require('express');
const router = express.Router();
const axios = require('axios');
const KEY = require('../../../key/key.js')
const {Kayn, REGIONS} = require('kayn');
const Kayn = Kayn(KEY)({
    region : REGIONS.KOREA,
    apiURLPrefix : 'https://%s.api.riotgames.com',
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

router.get("/getSoloRankMatchList", async (req, res) => {

    const getChampionOnlyMatchList = (championId) => {

        const REQUEST_URL = `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.query.encryptedAccountId}?queue=${420}&season=${req.app.get("seasonInfo").reverse()[0].id}&champion=${championId}&api_key=${KEY}`

        console.log(REQUEST_URL);

        return axios.get(REQUEST_URL);

    }

    try{
        const recent100Games = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.query.encryptedAccountId}?queue=${420}&season=${req.app.get("seasonInfo").reverse()[0].id}&api_key=${KEY}`);

        const mostPlayedInfo = getMostPlayedChampion(recent100Games.data.matches);
        console.log(mostPlayedInfo);
        
        const results = await Promise.all(mostPlayedInfo.map(championPlay => (getChampionOnlyMatchList(championPlay.championId))))

        let data = results.reduce((acc,curr) => {
            acc.push(curr.data);
            return acc;
        },[])

        fs.writeFileSync("Result.json",JSON.stringify(data));

        return res.json(recent100Games.data.matches).end();

    } catch (error) {
        console.log(error);
        return res.send(error).end();
    }
        
})



module.exports = router;