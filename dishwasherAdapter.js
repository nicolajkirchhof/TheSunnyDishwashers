/**
 * Created by fji on 28.02.2015.
 */

var dishwasherAdapter = (function () {

    var Relayr = require('relayr');

    var app_id = "790fb358-7172-4682-93d8-a079407c5cb7";
    //var dev_id = "497000a7-fd33-400f-9f83-845717a6f268";
    var dishwasher01_id = "e7ad3208-59d6-4757-bced-ba3d77c9274e";
    var token = "vlZlJC5CK.vRxapRVyd9ecP1kokpL3M6";
    var command_power_on = {"path": "power_unit", "command": "power", "value": 2};
    var command_power_off = {"path": "power_unit", "command": "power", "value": 1};

    // Initialise the libary
    var relayr = new Relayr(app_id);

    // Connect using the keys:
    relayr.connect(token, dishwasher01_id);

    // Listen and do stuff
    console.log('registering');
    relayr.on('data', function (topic, msg) {
        //console.log(topic + ":" + msg);
        console.log(msg);
        //msg.forEach(function (elem){
        //if (elem.meaning == 'luminosity'){
        //    changeListener(Math.round(elem.value*100/1024));
        //}
        //});

    });

    // Return an object exposed to the public
    return {

        /**
         *
         * @param (function(int)) callback that receives the current intensity of detected light as a percentage. Int value between 0 and 100;
         */
        onDishwasherStateChange: function (callback) {
            changeListener = callback;
        },

        /**
         *
         * @param success (function)
         * @param fail (function)
         */
        run: function (success, fail) {
            relayr.command(token, dishwasher01_id, command_power_on, function (err, user) {
                console.log(err || user);
                if (err === null){
                    success();
                }
                else {
                    fail();
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
