var enums = require('./enums.js');

var dishWasher = (function () {

    var applianceAdapter = null;
    var power = null;
    var presence = null;
    var directive = enums.applianceDirectiveEnum.UNDEFINED;

    var run = function() {
        directive = enums.applianceDirectiveEnum.RUN;

        // Tell adapter to start the machine
    }

    var setPowerState = function(powerState) {
       if (powerState === enums.powerStateEnum.STRONG) run();
    };

    return {
        // DI: adapter to physical dishwasher appliance
        setApplianceAdapter: function(dep) {
            applianceAdapter = dep;
        },

        // DI: power state aggregator
        setPower: function(dep) {
            power.onPowerstateChanged(setPowerState);
            power = dep;
        },

        // DI: power presence aggregator
        setPresence: function(dep) {
            presence = dep;
        },

        getDirective: function() { return directive },

        directives: directiveEnum
    };
})();

module.exports = dishWasher;