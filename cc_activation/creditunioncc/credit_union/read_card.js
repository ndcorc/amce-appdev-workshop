"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();
var request = require('request');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "ReadCard",
            "properties": {
                "cardImage": { "type": "string", "required": true }
            },
            "supportedActions": []
        };
    },

    invoke: (conversation, done) => {
        var cardImage = JSON.parse(conversation.properties().cardImage)["url"];
        //logger.debug('ReadCard: reading card number for card with URL: ' + cardImage);
        console.log(cardImage);

        var options = { 
            method: 'POST',
            url: 'https://creditunionapi-gse00014110.uscom-east-1.oraclecloud.com/read_card',
            form: { imageUrl: cardImage }
        };

        request(options, function (err, res, body) {
            if (err) throw new Error(err);
            var data = JSON.parse(body);
            var logMsg = '\n\nReadCard\n______________________________________________________________\n'
            logMsg +=  '______________________________________________________________\n'+data+'\n\n'
            console.log(logMsg);
            if (data.success) {
                conversation.variable("cardType", data.card.type);
                conversation.variable("cardNumber", data.card.number);
				conversation.keepTurn(true);
				conversation.transition(true); 
            } else {
				conversation.reply({"text": "There seems to have been a problem."})
				conversation.transition();
            }
            done();
        });
    }
};