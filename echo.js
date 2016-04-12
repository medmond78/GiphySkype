const fs = require('fs');
const restify = require('restify');
const skype = require('skype-sdk');
const giphy = require('giphy-api')();

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const synchronousRequest = new XMLHttpRequest();
//synchronousRequest.open('GET', 'https://randomapi.com/api/?key=XY96-764H-K6J1-UBDR&id=k1nbk4p&noinfo', false); // false means synchronous.
//synchronousRequest.send();

const baseURL= 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=';

//var obj = JSON.parse(synchronousRequest.responseText);
//console.log("First Name:", obj['results']['0']['object']['first_name']);
//console.log("Last Name:", obj['results']['0']['object']['last_name']);

const botService = new skype.BotService({
    messaging: {
        botId: process.env.BOT_ID,
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: process.env.APP_ID,
        appSecret: process.env.APP_SECRET
    }
});

botService.on('contactAdded', (bot, data) => {
    bot.reply(`Hello ${data.fromDisplayName}!`, true);
});

botService.on('personalMessage', (bot, data) => {

  giphy.random({
    tag: 'magic',
    fmt: 'json'
    }, function(err, res) {
  });

  //var obj = JSON.parse(res.responseText);

  //Reply
  //bot.reply(`Hey ${obj['data']['url']}. Thank you for your message: "${data.content}".`, true);

  bot.reply(`${res['data']['image_original_url']}`, true);

});

const server = restify.createServer();
server.use(restify.bodyParser());

/* Uncomment following lines to enable https verification for Azure.
server.use(skype.ensureHttps(true));
server.use(skype.verifySkypeCert({}));
*/

server.post('/v1/chat', skype.messagingHandler(botService));
const port = process.env.PORT || 8080;
server.listen(port);
console.log('Listening for incoming requests on port ' + port);
