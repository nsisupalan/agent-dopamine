const express = require('express');
const multer = require('multer');
const path = require("path");
const fs = require("fs");
const router = express.Router()

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
            + path.extname(file.originalname))
    }
});

const videoStorage = multer.diskStorage({
    destination: 'videos', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
         + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 * 10 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

const videoUpload = multer({
    storage: videoStorage,
    limits: {
    fileSize: 10000000 * 5 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
         return cb(new Error('Please upload a video'))
      }
      cb(undefined, true)
   }
})

// Image POST handler.
router.post('/uploadImage', imageUpload.single('myImage'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Video POST handler.
router.post('/uploadVideo', videoUpload.single('myMovie'), (req, res) => {
    res.send(req.file)
 }, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
 })

// Create folder for uploading files.
const imagesDir = path.join(path.dirname(require.main.filename), "images");
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}
const videosDir = path.join(path.dirname(require.main.filename), "videos");
if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir);
}

module.exports = router;