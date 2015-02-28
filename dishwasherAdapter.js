var dishwasherAdapter = (function () {

    // ------------
    // Connects the abstract dishWasher controller to
    // an actual HomeConnect dishwasher via the relayr API.
    // Since that API is not complete at the moment, we hab to use quite a
    // lot of raw commands here.
    // ------------
    var relayr = require('./relayrApp');

    var state = {
        isWaitingForRemoteStartActive: false,
        callbackWaitingForRemoteStartActive: null,
        isWaitingForPowerOn: false,
        callbackWaitingForPowerOn: null
    }

    //var command_power_on = {"path": "power_unit", "command": "power", "value": 2};
    //var command_power_off = {"path": "power_unit", "command": "power", "value": 1};
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
    var command_query_power_on = {"path": "raw", "command": 539};
    var command_query_remote_state_active = {"path": "raw", "command": 517};
    var command_stop_program = {"path": "raw", "command": 512, "value": true};

    // Connect using the keys:
    relayr.app.connect(relayr.authToken, relayr.dishwasherId);

    // Listen and do stuff
    console.log('registering');
    relayr.app.on('data', function (topic, msg) {
        console.log(msg);

        if (state.isWaitingForPowerOn) {
            console.log("Searching for power state...")
            msg.readings.forEach(function (elem) {
                if (elem.path == 'power_unit') {
                    if (state.callbackWaitingForPowerOn) state.callbackWaitingForPowerOn(elem.value === '2')
                    state.callbackWaitingForPowerOn = null;
                    state.isWaitingForPowerOn = false;
                }
            })
        }

        if (state.isWaitingForRemoteStartActive) {
            console.log("Searching for remote state active...")
            msg.readings.forEach(function (elem) {
                if (elem.path == '517') {
                    if (state.callbackWaitingForRemoteStartActive) state.callbackWaitingForRemoteStartActive(elem.value === '2')
                    state.callbackWaitingForRemoteStartActive = null;
                    state.isWaitingForRemoteStartActive = false;
                }
            })
        }

    });

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
        onDishwasherStateChange: function (callback) {
            changeListener = callback;
        },

        run: function (success, fail) {
            sendRelayrCommand(command_start_eco_50, success, fail);
        },

        abort: function (success, fail) {
            sendRelayrCommand(command_stop_program, success, fail);
        },

        queryPowerState: function (callback) {
            state.isWaitingForPowerOn = true;
            state.callbackWaitingForPowerOn = callback;
            sendRelayrCommand(command_query_power_on, null, function () {
                state.isWaitingForPowerOn = false;
                state.callbackWaitingForPowerOn = null;
            })
        },

        sendRawCommand: function (command) {
            console.log("Sending " + command);
            sendRelayrCommand({"path": "raw", "command": command});
        }

    };
})();

module.exports = dishwasherAdapter;
