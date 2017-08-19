
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'OS3ckApBsExdHU+lPbwqpN9joiqCF6Xkir7G8+3Odh3yoPU+b3eoZDmu0Yon7wd3xvEg8yA1Q+bBQruqlGC/iy+eUXV+ViUQ76dytwE7pLh8cOvvWj0Et+8bXNSDae/QcyFkeu6tqj6xdQFrtFndSAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'dc4aa780d6557e4dc579fc51661eccbd'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);