var enums = require('./enums.js');

// ---------------
// Implements an abstract controller that controls the dishwasher, depending
// on the status of the availability of renewable energy and presence of
// people in the house.
// The controller is reactive: is accepts callbacks from the connected
// sensors and raises events accordingly.
// For adding more appliances (ovens, tumblers...) probably a similar kind of
// functionality is needed, but for now we'd rather not speculate. Feel
// free to refactor.
// ---------------

var dishWasher = (function () {

    // Time (ms) until a started washing program is aborted
    var TIME_TO_ABORT = 10000;

    var applianceAdapter = null;
    var directive = enums.applianceDirectiveEnum.WAIT;
    var isRunning = false;
    var isReady = false;

    // Poll for a ready state of the appliance.
    var pollReady = function() {
        console.log('DISHWASHER CHECKING READY STATE...');
        if (!applianceAdapter) return;

        // Prevent overlapping query cycles
        if (querying) return;
        var querying = true;

        applianceAdapter.queryReadyState(function(value){
            isReady = value;
            console.log('DISHWASHER READY STATE is ' + isReady);
            querying = false;
        })
    }

    // Tell the dishwasher to run
    var run = function() {
        directive = enums.applianceDirectiveEnum.RUN;

        // If the dishwasher has successfully been started, do not try to start it again
        if (isRunning) return;

        console.log('DISHWASHER RUN...');
        if (!applianceAdapter) return;

        // For the moment, just fire the Run command once and don't check result...
        // ...better would be: retry, notify user, try to find out what the heck happened
        // by getting detailed status
        applianceAdapter.run(
            function() {
                isRunning = true;
                console.log('DISHWASHER RUN SUCCEEDED')

                // For the purpose of the Hackathon, abort the
                // dishwasher program! The appliance is not connected
                // to water, and goes into an error message when it's kept
                // running (and won't like it much).
                setTimeout(abort, TIME_TO_ABORT);
            },
            function() {
                console.log('DISHWASHER RUN FAILED')
            } );
    };

    var abort = function() {
        directive = enums.applianceDirectiveEnum.ABORT;

        // If the dishwasher is not running, there is noting to abort
        if (!isRunning) return;
        console.log('DISHWASHER ABORT...');

        // For the moment, just fire the Run command once. Since the Abort
        // command takes some time to complete, the status should be monitored.
        if(applianceAdapter) applianceAdapter.abort(
            function() {
                isRunning = false;
                console.log('DISHWASHER ABORT SUCCEEDED')
            },
            function() {
                console.log('DISHWASHER ABORT FAILED')
            } );
    }

    // Reset the state of this controller - internal function to make DI reliable
    var reset = function() {
        directive = enums.applianceDirectiveEnum.WAIT;
        isRunning = false;
    };

    // React to the Power controller to announce a changes state in
    // the availability of solar power: run the appliance if STRONG
    var setPowerState = function(powerState) {
       if (powerState === enums.powerStateEnum.STRONG) run();
    };

    // React to the Presence controller to announce that someone is at home
    var setPresence = function(isAnybodyThere) {
        if (isAnybodyThere) run();
    };

    return {
        // DI: adapter to physical dishwasher appliance
        setApplianceAdapter: function(dep) {
            reset();
            applianceAdapter = dep;

            // Start polling for the Ready state of the appliance
            setInterval(pollReady, 2000);
        },

        // DI: power state aggregator
        setPower: function(dep) {
            reset();
            dep.onPowerStateChanged(setPowerState)
        },

        // DI: power presence aggregator
        setPresence: function(dep) {
            reset();
            dep.onPresenceChanged(setPresence);
        },

        // Return if the appliance should run
        getDirective: function() { return directive },

        // Return if the appliance is running
        getIsRunning: function() { return isRunning },

        // Return if the appliance is ready (powered and primed)
        getIsReady: function() { return isReady }
    };
})();

module.exports = dishWasher;