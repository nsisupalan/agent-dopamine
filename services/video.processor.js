const extractFrames = require('ffmpeg-extract-frames')
const imageProcessor = require('./image.processor');
const uuidv4 = require('uuid');
const Observer = require('./observer');

const FRAME_TIMESTAMPS = ['25%', '50%', '75%', '99%'];

const processVideo = (fileName) => {
    const baseFodler = uuidv4.v4();
    extractFrames({
        input: `videos/${fileName}`,
        output: `images/frames/${baseFodler}/screenshot-%i.jpg`,
        timestamps: FRAME_TIMESTAMPS,
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    })

    return new Promise((a, r) => {
        let counter = 0;
        const promises = [];
        const observer = new Observer();
        observer.on('file-added', event => {
            const filePath = event.filePath;
            console.log(`processing file ${filePath}`)
            counter++;
            const imgBuffer = event.data
            promises.push(imageProcessor.detectFaces(imgBuffer)); 
            if(counter >= FRAME_TIMESTAMPS.length) {
                console.log('Done.....');
                observer.removeAllListeners();
                a(promises);
            } 
        });
        observer.watchFolder(`images/frames/${baseFodler}`);
    })
}

module.exports = {
    processVideo
}
