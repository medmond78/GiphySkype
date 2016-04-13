const fs = require('fs');
const restify = require('restify');
const request = require('request');
const skype = require('skype-sdk');

const SEND_TO_SKYPE_USER = '8:matthew.pausley';
const IMAGE_URL = 'http://media4.giphy.com/media/fjqlPA6KSFLqw/giphy.gif';

const botService = new skype.BotService({
    messaging:{
        botId:'701606e8-cbfe-45be-a59f-5a7281cc3f08',
        serverUrl:"https://apis.skype.com",
        requestTimeout:15000,
        appId:'154d8050-513a-4c55-a2dd-521ea367454b',
        appSecret:'ioVHn8TH4b8pbUKgvvbpZov'
    }
});

// Sending local file
fs.readFile('./my_image.jpg', { encoding: 'binary' }, (err, data) => {
    if (err) {
        return console.error(err);
    }
    botService.sendAttachment(SEND_TO_SKYPE_USER, 'my_image.jpg', 'Image', data.toString('base64'), null, (err, response) => {

        console.log(response);
        if (err) {
            return console.error(err);
        }
    });
});

// Sending downloaded file
request({
    method: 'GET',
    url: IMAGE_URL,
    encoding: 'binary'
}, function(err, response, data) {
    if (err) {
        return console.error(err);
    }
    botService.sendAttachment(SEND_TO_SKYPE_USER, null, 'Image', data.toString('base64'), null, (err, response) => {
        if (err) {
            return console.error(err);
        }
        console.log(response);
    });
});
