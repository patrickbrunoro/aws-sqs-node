const express = require('express');
const app = express();
const aws = require('aws-sdk');
const bodyParser = require('body-parser')
const config = require('./config.json');

const queueUrl = config.queueUrl;
aws.config.update({
    "accessKeyId": config.accessKeyId,
    "secretAccessKey": config.secretAccessKey,
    "region": config.region
});
const sqs = new aws.SQS({apiVersion: '2012-11-05'});

const jsonParser = bodyParser.json();
app.post('/send', jsonParser, function (req, res) {
    const body = req.body;
    console.log("body", body)
    if (!body)
        return res.status(400).send("Missing body");
    if (Object.entries(body).length === 0 && body.constructor === Object)
        return res.status(400).send("JSON is empty! You're using Content-Type=application/json?");
    const params = {
        DelaySeconds: 0,
        MessageGroupId: "MyMessageGroupId",
        MessageBody: JSON.stringify(body),
        QueueUrl: queueUrl,
    };
    sqs.sendMessage(params, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
app.get('/receive', function (req, res) {
    const params = {
        QueueUrl: queueUrl,
        VisibilityTimeout: 1
    };
    sqs.receiveMessage(params, function (err, data) {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(data);
            if (!data.Messages || data.Messages.length === 0) return res.send(data);
            const deleteParams = {
                QueueUrl: queueUrl,
                ReceiptHandle: data.Messages[0].ReceiptHandle
            };
            sqs.deleteMessage(deleteParams, function (err, dataD) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.send(JSON.parse(data.Messages[0].Body));
                }
            });
        }
    });
});
const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('AWS SQS listening in http://%s:%s', host, port);
});