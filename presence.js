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
