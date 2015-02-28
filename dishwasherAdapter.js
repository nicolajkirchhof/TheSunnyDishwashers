var dishwasherAdapter = (function () {

    var Relayr = require('relayr');
    var config = require('./config');

    var command_power_on = {"path": "power_unit", "command": "power", "value": 2};
    var command_power_off = {"path": "power_unit", "command": "power", "value": 1};

    // Initialise the library
    var relayr = new Relayr(config.relayr.appId);

    // Connect using the keys:
    relayr.connect(config.relayr.authToken, config.relayr.dishwasherId);

    // Listen and do stuff
    console.log('registering');
    relayr.on('data', function (topic, msg) {

        console.log(msg);

    });

    // Return an object exposed to the public
    return {
        onDishwasherStateChange: function (callback) {
            changeListener = callback;
        },

        run: function (success, fail) {
            relayr.command(token, dishwasher01_id, command_power_on, function (err, user) {
                console.log(err || user);
                if (err === null){
                    if(success) success();
                }
                else {
                    if (fail) fail();
                }
            })
        },

        /**
         *
         * @param success (function)
         * @param fail (function)
         */
        stop: function (success, fail) {
            relayr.command(token, dishwasher01_id, command_power_off, function (err, user) {
                console.log(err || user);
                if (err === null) {
                    success();
                }
                else {
                    fail();
                }

            })
        }

    };
})();

module.exports = dishwasherAdapter;
