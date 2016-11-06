var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Cylon = require('cylon');
var schedule = require('node-schedule');
var moment = require('moment');



var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/*
Cylon.robot({
    connections: {
        arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
    },

    devices: {
        led: { driver: 'led', pin: 13 },
        button: { driver: 'button', pin: 2 },
        buzzer: { driver: 'direct-pin', pin: 9 }
    },

    work: function(my) {
*/
        var j = null;
        var timeout = null;


        var currentState = {
            time: '12:12',
            days: [
                { day:'monday', active: true},
                { day:'tuesday', active: true},
                { day:'wednesday', active: true},
                { day:'thursday', active: true},
                { day:'friday', active: true},
                { day:'saturday', active: false},
                { day:'sunday', active: false}
            ],
            active: true,
            repeat: true
        };

        function startAlarm () {
            var cronDate = '';
            cronDate = currentState.time.split(':')[0]+' '+currentState.time.split(':')[1]+' * * ';

            var cronDays = [];
            currentState.days.forEach(function (day) {
                if (day.active) {
                    cronDays.push(days.indexOf(day.day));
                }
                //console.log(day);
            });

            cronDate += cronDays.join(',');

            console.log(cronDate);


            j = schedule.scheduleJob(cronDate, function(){
                console.log('wake up');
                /*
                my.led.turnOn();
                var buzzerValue = 1;
                timeout = every((1).second(), function () {
                    my.buzzer.digitalWrite(buzzerValue);
                    buzzerValue = 1 - buzzerValue;
                });*/
            });
        }

        function stopAlarm () {
            if (j) {
                j.cancel();
            }
        }

        function setupClock () {
            stopAlarm();
            if (currentState.active) {
                startAlarm();
            }
        }

        setupClock();

/*
        my.button.on('push', function() {
            console.log('stop alarm');
            clearInterval(timeout);
        });*/


        server.listen(8080, function () {
            console.log('listening on http://localhost:8080');
        });

        app.get('/', function (req, res) {
            res.sendFile(__dirname + '/index.html');
        });


        io.on('connection', function (socket) {
            socket.emit('current-state', currentState);

            socket.on('time-changed', function (time) {
                currentState.time = time;
                socket.broadcast.emit('time-changed', currentState.time);
                setupClock();

            });

            socket.on('active-changed', function (active) {
                currentState.active = active;
                socket.broadcast.emit('active-changed', currentState.active);
                setupClock();

            });

            socket.on('repeat-changed', function (repeat) {
                currentState.repeat = repeat;
                //console.log(repeat);
                socket.broadcast.emit('repeat-changed', currentState.repeat);
                setupClock();

            });

            socket.on('day-changed', function (changedDay) {
                currentState.days.forEach(function (day) {
                    if (day.day == changedDay.day) {
                        day.active = changedDay.active;
                    }
                });
                setupClock();

                socket.broadcast.emit('day-changed', changedDay);
            });
        });
/*
    }
}).start();
*/
