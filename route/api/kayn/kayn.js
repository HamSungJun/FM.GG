const KEY = require('../../../key/key.js')
const {Kayn, REGIONS} = require('kayn');
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
        delayBeforeRetry: 1000,
        burst: true,
        shouldExitOn403: false,
    },
})

module.exports = kayn;