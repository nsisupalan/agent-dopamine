const express = require('express');
const uploadRoute = require('./routes/upload');
const analyzerRoute = require('./routes/analyzer');

const app = express()

const port = process.env.PORT || 3000

app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

app.use(express.static(__dirname + "/"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/img/:name", function (req, res) {
    res.sendFile(`${__dirname}/images/${req.params.name}`);
});

app.use(uploadRoute);
app.use(analyzerRoute);

app.listen(port, () => {
    console.log('Agent Dopamine is up on port ' + port);
})