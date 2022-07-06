/*
const imgData = fs.readFileSync('images/screenshot-4.jpg', { encoding: 'base64' });
const imgBuffer = Buffer.from(imgData, 'base64')
detectFaces(imgBuffer);
*/

const express = require('express');
const path = require("path");
const fs = require("fs");
const router = express.Router()
const imageAnalyzer = require('../services/image.processor');
const videoAnalyzer = require('../services/video.processor');

router.post('/process-img', (req, res) => {
    console.log(req.body);
    const fileName = req.body.fileName;
    console.log(`Processing image ${fileName}`);
    const imgData = fs.readFileSync(`images/${fileName}`, { encoding: 'base64' });
    const imgBuffer = Buffer.from(imgData, 'base64')
    imageAnalyzer.detectFaces(imgBuffer)
        .then(data => res.send(data))
        .catch(err => res.sendStatus(500));
})

router.post('/process-video', (req, res) => {
    console.log(req.body);
    const fileName = req.body.fileName;
    console.log(`Processing video ${fileName}`);
    videoAnalyzer.processVideo(fileName)
        .then(data => {
            console.log('Video Process output')
            Promise.all(data).then(d => {
                console.log(d);
                res.send(d);
            })
            
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
})


module.exports = router;