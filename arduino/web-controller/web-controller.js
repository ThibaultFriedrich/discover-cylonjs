var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Cylon = require('cylon');


var lightOn = false;

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
  },

  devices: {
    led: { driver: 'led', pin: 13 },
    button: { driver: 'button', pin: 2 }
  },

  work: function(my) {
      server.listen(8080, function () {
          console.log('listening on http://localhost:8080');
      });

      app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
      });

      io.on('connection', function (socket) {
        socket.emit('current-state', lightOn);

        socket.on('switch', function (data) {
          //console.log(data);
          my.led.toggle();
          lightOn = !lightOn;
          io.sockets.emit('switched', lightOn);
          console.log(lightOn);
        });
      });

      my.button.on('push', function() {
        my.led.toggle();
        lightOn = !lightOn;
        io.sockets.emit('switched', lightOn);
        console.log(lightOn);
      });

  }
}).start();
