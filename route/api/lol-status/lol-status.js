const express = require('express');
const router = express.Router();
const kayn = require('../kayn/kayn.js');

router.get("/", async (req, res) => {

    try{
        const lolStatus = await kayn.Status.get();
        console.log(lolStatus);
        res.send(lolStatus).end();
    } catch (error) {
        res.status(error.statusCode).json({
            status : error.statusCode,
            mesg : "리그오브레전드 서버 상태에 문제가 있습니다."
        }).end();
    }

})

module.exports = router;