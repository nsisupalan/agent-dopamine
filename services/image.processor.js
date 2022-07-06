const aws = require('../utils/aws');

const detectFaces = (imgBuffer) => {
    const params = {
        "Image": {
            'Bytes': imgBuffer
        },
        Attributes: ['ALL']
    }
    return new Promise((a, r) => {
        aws.rekogClient.detectFaces(params, (err, response) => {
            if (err) {
                console.log(err, err.stack); // an error occurred
                r(err);
            } else {
                console.log(`Detected faces for ${response.FaceDetails.length}`)
                a(response.FaceDetails)
            }
        })
    })
};

module.exports = {
    detectFaces
}
