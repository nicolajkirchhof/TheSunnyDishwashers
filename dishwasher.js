var enums = require('./enums.js');

var dishWasher = (function () {

    var applianceAdapter = null;
    var directive = enums.applianceDirectiveEnum.WAIT;

    var run = function() {
        directive = enums.applianceDirectiveEnum.RUN;

        // Tell adapter to start the machine
    };

    var reset = function() {
        directive = enums.applianceDirectiveEnum.WAIT;
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

        getDirective: function() { return directive }
    };
})();

module.exports = dishWasher;