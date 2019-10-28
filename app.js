const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname+'/build'));
app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"build","index.html"));
})

app.listen(9000, () => {
    console.log('Example app listening on port 80!');
})