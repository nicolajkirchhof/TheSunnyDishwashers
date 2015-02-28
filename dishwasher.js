var enums = require('./enums.js');

// ---------------
// Represents the business-logic side of the dishwasher.
// For adding more appliances (ovens, tumblers...) probably a similar kind of
// functionality is needed, but for now we'd rather not speculate. Feel
// free to refactor.
// ---------------

var dishWasher = (function () {

    var applianceAdapter = null;
    var directive = enums.applianceDirectiveEnum.WAIT;
    var isRunning = false;

    var run = function() {
        directive = enums.applianceDirectiveEnum.RUN;

        // If the dishwasher has successfully been started, do not try to start it again
        if (isRunning) return;

        console.log('DISHWASHER RUN!');

        // For the moment, just fire the Run command once and don't check result...
        // ...better would be: retry, notify user
        if(applianceAdapter) applianceAdapter.run(
            function() {
                isRunning = true;
                console.log('DISHWASHER RUN command SUCCEEDED')
            },
            function() {
                isRunning = false;
                console.log('DISHWASHER RUN command FAILED')
            } );
    };

    var reset = function() {
        directive = enums.applianceDirectiveEnum.WAIT;
        isRunning = false;
    };

    var setPowerState = function(powerState) {
       if (powerState === enums.powerStateEnum.STRONG) run();
    };

    var setPresence = function(isAnybodyThere) {
        if (isAnybodyThere) run();
    } ;

    return {
        // DI: adapter to physical dishwasher appliance
        setApplianceAdapter: function(dep) {
            reset();
            applianceAdapter = dep;
        },

        // DI: power state aggregator
        setPower: function(dep) {
            reset();
            dep.onPowerStateChanged(setPowerState);
        },

        // DI: power presence aggregator
        setPresence: function(dep) {
            reset();
            dep.onPresenceChanged(setPresence);
        },

        getDirective: function() { return directive },

        getIsRunning: function() { return isRunning }
    };
})();

module.exports = dishWasher;