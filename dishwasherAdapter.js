var dishwasherAdapter = (function () {

    var relayr = require('./relayrApp');

    var command_power_on = {"path": "power_unit", "command": "power", "value": 2};
    var command_power_off = {"path": "power_unit", "command": "power", "value": 1};


    // Connect using the keys:
    relayr.app.connect(relayr.authToken, relayr.dishwasherId);

    // Listen and do stuff
    console.log('registering');
    relayr.app.on('data', function (topic, msg) {

        console.log(msg);

    });

    // Return an object exposed to the public
    return {
        onDishwasherStateChange: function (callback) {
            changeListener = callback;
        },

        run: function (success, fail) {
            relayr.app.command(relayr.authToken, relayr.dishwasherId, command_power_on, function (err, user) {
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
            relayr.app.command(relayr.authToken, relayr.dishwasherId, command_power_off, function (err, user) {
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
