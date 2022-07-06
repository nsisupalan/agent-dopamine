const AWS = require("aws-sdk");
const config = require('./config.json');

AWS.config.loadFromPath(`${process.cwd()}/utils/config.json`);
const rekogClient = new AWS.Rekognition({ region: AWS.config.region });

module.exports = {
    rekogClient,
    collectionName: config.collectionName
}