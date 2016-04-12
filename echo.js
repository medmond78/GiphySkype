const fs = require('fs');
const restify = require('restify');
const skype = require('skype-sdk');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var synchronousRequest = new XMLHttpRequest();
synchronousRequest.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=american+psycho', false); // false means synchronous.
synchronousRequest.send();


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
  //  bot.reply(`Hey ${data.from}. Thank you for your message: "${data.content}".`, true);
  //Call the giphy api

  bot.reply(`http://i.giphy.com/9poL1pf3IbCO4.gif`,true)
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
