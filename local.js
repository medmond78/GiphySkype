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

var data = 'magic';

  synchronousRequest.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + data, false); // false means synchronous.
  synchronousRequest.send();
  var obj = JSON.parse(synchronousRequest.responseText);
  console.log(obj['data']['url']);
  //Reply
  //bot.reply(`Hey ${obj['data']['url']}. Thank you for your message: "${data.content}".`, true);
