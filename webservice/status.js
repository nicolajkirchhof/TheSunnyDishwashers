var status = (function () {

    var power = require('./../power');
    var presence = require('./../presence');
    var dishWasher = require('./../dishwasher');
    var enums = require('./../enums.js');

    return {
        getUpdate : function() {
            return {
                powerState : power.getPowerState(),
                isPresent : presence.isPresent(),
                dishWasherIsRunning : dishWasher.getIsRunning(),
                dishWasherIsReady : dishWasher.getIsReady()
            };
        }
    };
})();

module.exports = status;
