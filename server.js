var server = require('http').createServer(),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: server }),
    express = require('express'),
    app = express(),
    dgram = require('dgram'),
    client = dgram.createSocket('udp4')

app.use(express.static('static'))

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    var payload = JSON.parse(message);
    console.log(payload);

    // TODO play is a bad command to play; should be controlling something instead
    client.send("/run code play 60", 4557, "raspberrypi.local");
  });
});

server.on('request', app);
server.listen(process.env.PORT || 8080, function () {
  console.log('Listening on ' + server.address().port);
});
