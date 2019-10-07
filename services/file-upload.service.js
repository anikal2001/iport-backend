const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const express= require('express')
const config = require("../config.js");

//configuring the AWS environment
const s3 = new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    useAccelerateEndpoint: true
  });







/*
exports.upload = function (req, res) {
    var file = req.files.file;
    fs.readFile(file.path, function (err, data) {
        if (err) throw err; // Something went wrong!
        var s3bucket = new AWS.S3({params: {Bucket: 'iris-iport'}});
        s3bucket.createBucket(function () {
            var params = {
                Key: file.originalFilename, //file.name doesn't exist as a property
                Body: data
            };
            s3bucket.upload(params, function (err, data) {
                // Whether there is an error or not, delete the temp file
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('Temp File Delete');
                });

                console.log("PRINT FILE:", file);
                if (err) {
                    console.log('ERROR MSG: ', err);
                    res.status(500).send(err);
                } else {
                    console.log('Successfully uploaded data');
                    res.send("bitch ass nigga")
                }
            });
        });
    });
};
*/
