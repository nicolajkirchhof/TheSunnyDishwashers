var dishwasherAdapter = (function () {

    var Relayr = require('relayr');

    var app_id = "790fb358-7172-4682-93d8-a079407c5cb7";
    var dishwasher01_id = "e7ad3208-59d6-4757-bced-ba3d77c9274e";
    var token = "vlZlJC5CK.vRxapRVyd9ecP1kokpL3M6";
    var command_power_on = {"path": "power_unit", "command": "power", "value": 2};
    var command_power_off = {"path": "power_unit", "command": "power", "value": 1};

    // Initialise the library
    var relayr = new Relayr(app_id);

    // Connect using the keys:
    relayr.connect(token, dishwasher01_id);

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
