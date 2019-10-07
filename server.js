var express = require('express');
app = express();
const router = express.Router();
var cors = require('cors')
const uploadService = require('./services/file-upload.service')
const AWS = require('aws-sdk');

app.use(cors())


app.use(express.json());

var keyname = ''

app.post('/api/login', function(req,res){
    res.send(req.body);
})

app.post('/api/videos/upload', function(req,res){
    keyname = req.body[0];
    res.send(req.body)
})
app.get('/api/videos/upload', (req,res)=>{
    uploadService.upload(req,res);
    res.status(400)
})

const config = require("./config.js");

//configuring the AWS environment
const s3 = new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    useAccelerateEndpoint: true,
    signatureVersion: 'v4',
    region: 'us-east-2'
  });

function getdate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '-' + dd + '-' + yyyy;
    return today;
}


app.get('/api/videos/upload/generatepresignedurl', function (req, res) {
    var fileurls = [];

    /*setting the presigned url expiry time in seconds, also check if user making the request is an authorized user for your app (this will be specific to your app’s auth mechanism so i am skipping it)*/
    const signedUrlExpireSeconds = 60 * 60;

    const myBucket = config.s3bucketname;
    const myKey = keyname + ' ' + getdate().toString();

    const params = {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds,
        ACL: "bucket-owner-full-control",
        ContentType: 'video/mp4, '
    };

    s3.getSignedUrl('putObject', params, function (err, url) {
        if (err) {
            console.log('Error getting presigned url from AWS S3');
            res.json({ success: false, message: 'Pre-Signed URL error', urls: fileurls , error: err});
        }
        else {
            fileurls[0] = url;
              console.log('Presigned URL: ', fileurls[0]);
            res.json({ success: true, message: 'AWS SDK S3 Pre-signed urls generated successfully.', urls: fileurls[0] });
        }
    });



});





var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);

