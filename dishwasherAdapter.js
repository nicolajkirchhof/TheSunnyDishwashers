var dishwasherAdapter = (function () {

    // ------------
    // Connects the abstract dishWasher controller to
    // an actual HomeConnect dishwasher via the relayr API.
    // Since that API is not complete at the moment, we hab to use quite a
    // lot of raw commands here.
    // ------------
    var relayr = require('./relayrApp');

    // Callbacks for appliance state changes
    var unitPoweredCallback;

    // Command structure that starts the "ECO 50" washing program
    var command_start_eco_50 = {
        "path": "raw",
        "command": 565,
        "value": {
            "enum": [{
                "program": 8196,
                "options": [{"uid": 5123, "value": false}, {"uid": 5124, "value": false}, {
                    "uid": 5128,
                    "value": false
                }, {"uid": 5127, "value": false}, {"uid": 5126, "value": false}]
            }]
        }
    };

    // Command structure to query if the appliance has power on
    var command_query_power_on = {"path": "raw", "command": 539};

    // Command structure to tell the appliance to abort the running washing program
    var command_stop_program = {"path": "raw", "command": 512, "value": true};

    // Connect to the dishwasher. This enables us to listen to the events
    // being logged.
    relayr.app.connect(relayr.authToken, relayr.dishwasherId);
    console.log('HOMECONNECT DISHWASHER connecting, starting to listen');
    relayr.app.on('data', function (topic, msg) {

        // diagnostic logging
        var logData = {
            source : 'HOMECONNECT DISHWASHER',
            data : msg
        };
        console.log(logData);

        // Parse the message for information whether the dishwasher is
        // powered on - this is in the 'power_unit' reading
        msg.readings.forEach(function (reading) {
            switch(reading.path)
            {
                case 'power_unit':
                    var isUnitPowered = reading.value === '2';

                    // Use the callback once, then discard it. The callback is
                    // set by the queryReadyState operation this module exposes.
                    if (unitPoweredCallback) unitPoweredCallback(isUnitPowered);
                    unitPoweredCallback = null;
                    break;
            }
        });
    });

    // Generic call of a command against the relayr cloud.
    var sendRelayrCommand = function (command, success, fail) {
        relayr.app.command(relayr.authToken, relayr.dishwasherId, command, function (err, user) {
            console.log(err || user);
            if (err === null) {
                if (success) success();
            }
            else {
                if (fail) fail();
            }
        });
    };

    // Return an object exposed to the public
    return {

        // Run the powered-on dishwasher by choosing a washing program -
        // in this case, the ECO 50 program
        run: function (success, fail) {
            sendRelayrCommand(command_start_eco_50, success, fail);
        },

        // Abort the dishwasher run
        abort: function (success, fail) {
            sendRelayrCommand(command_stop_program, success, fail);
        },

        // Call back for the event that the dishwasher tells us if it's
        // on or off. The callback isn't that simple - the command itself
        // does not return the value. Instead, it more like entices the
        // appliance to drop the information into its log message stream,
        // an when we find it, we'll call it.
        queryReadyState: function (callback) {
            unitPoweredCallback = callback;
            sendRelayrCommand(command_query_power_on, null, null);
        },

        // Mostly for testing purposes, send an arbitrary command to the appliance.
        // Better don't use for real business logic as it blurs the lines of abstraction.
        sendRawCommand: function (command) {
            console.log("Sending " + command);
            sendRelayrCommand({"path": "raw", "command": command});
        }

    };
})();

module.exports = dishwasherAdapter;
