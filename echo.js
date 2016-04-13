const fs = require('fs');
const restify = require('restify');
const skype = require('skype-sdk');
//const giphy = require('giphy-api')();

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const synchronousRequest = new XMLHttpRequest();
//synchronousRequest.open('GET', 'https://randomapi.com/api/?key=XY96-764H-K6J1-UBDR&id=k1nbk4p&noinfo', false); // false means synchronous.
//synchronousRequest.send();


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

  console.log(data.content);
  synchronousRequest.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + data.content, false); // false means synchronous.
  synchronousRequest.send();
  var obj = JSON.parse(synchronousRequest.responseText);

  //Reply
  //bot.reply(`Hey ${obj['data']['url']}. Thank you for your message: "${data.content}".`, true);
  request({
      method: 'GET',
      url: ${obj['data']['image_original_url'],
      encoding: 'binary'
  }, function(err, response, data) {
      if (err) {
          return console.error(err);
      }
      botService.sendAttachment(data.from, null, 'Image', data.toString('base64'), null, (err, response) => {
          if (err) {
              return console.error(err);
          }
          console.log(response);
      });
  });

  bot.reply(`${obj['data']['image_original_url']}`, true);
  //bot.reply(`${res}`, true);

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
