// -------------
// Implements an abstract controller that provides the application
// with the information if people are present in the house.
// The controller is reactive: is accepts callbacks from the connected
// sensors and raises events accordingly.
// The current implementation just knows if people are there or not,
// an interesting extension would be to work with an ETA and start
// the appliances earlier, accordingly.
// --------------

var presence = (function () {

    // privates

    var isPresent = false;

    var callback = null;

    var presenceDetectedPrivate = function () {
        if (callback !== null && !isPresent){
            isPresent = true;
            callback(true);
        }
    };

    var absenceDetectedPrivate = function () {
        if (callback !== null && isPresent) {
            isPresent = false;
            callback(false);
        }
    };

    /**/    // Return an object exposed to the public
    return {

        // Add items to our basket
        onPresenceChanged: function (notifier) {
            callback = notifier;
        },

        isPresent: function (){
            return isPresent;
        },

        registerPresenceProvider: function(provider) {
            provider.onPresenceUpdate({
                presenceDetected: presenceDetectedPrivate,
                absenceDetected: absenceDetectedPrivate
            });
        }

    };
})();

module.exports = presence;
