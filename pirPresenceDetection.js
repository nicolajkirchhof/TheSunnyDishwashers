var pirPresenceDetection = (function () {

    var Firebase = require('firebase');
    var access_token = 'c.X0MQvdyNQyflHcWILSE51xOMfnFKKLT0It2ztnhnJ1RuoUDr9ZjrinCvi1YPSTuOGJp0dXwcec12KWWccB9pihhgHKfqqYi2ZB1GTr7vlRjkXyfBl1o6qtlnYv1TzIzPq2TfvvXFDH30l9rw';

    var nestConnection = new Firebase('wss://developer-api.nest.com');

    nestConnection.authWithCustomToken(access_token, function (error, authData) {
        if (error) {
            console.log("Login to nest failed", error);
        }
        else {
            console.log("Authentication success: ", authData);
        }
    });

    var command_home = {
        "structures": {
            "RR7_f6h6A2g8cddNQM3yfzA_R4B7_tc2HEz2TUGLYmecWxVN8wsCqw": {
                "away": "home"
            }
        }
    }

    var command_away = {
        "structures": {
            "RR7_f6h6A2g8cddNQM3yfzA_R4B7_tc2HEz2TUGLYmecWxVN8wsCqw": {
                "away": "away"
            }
        }
    }


    var SerialPort = require("serialport").SerialPort

    var serialPort = new SerialPort("COM10", {
        baudrate: 57600
    });

    var isActive = false;

    var sendHomeCommand = function () {
        nestConnection.set(command_home, function (value) {
            console.log(value);
        })
    };

    var sendAwayCommand = function () {
        nestConnection.set(command_away, function (value) {
            console.log(value);
        })
    };

    serialPort.on("open", function () {
        console.log('open');
        serialPort.on('data', function (data) {
            if (isActive) {
                console.log('data received: ' + data);
                if(116===data[0]){
                    sendHomeCommand();
                }
                else{
                    sendAwayCommand();
                }
            }
        });
    });

    // Return an object exposed to the public
    return {

        start: function () {
            isActive = true;
        },

        stop: function () {
            isActive = false;
        }

    }
})();

module.exports = pirPresenceDetection;
