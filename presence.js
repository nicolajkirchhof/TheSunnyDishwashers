var presence = (function () {

    // privates

    var callback = null;

    var presenceDetectedPrivate = function () {
        if (callback !== null) {
            callback(true);
        }
    };

    var absenceDetectedPrivate = function () {
        if (callback !== null) {
            callback(false);
        }
    };


    /**/    // Return an object exposed to the public
    return {

        // Add items to our basket
        onPresenceChanged: function (notifier) {
            callback = notifier;
        },

        // Public alias to a  private function
        presenceDetected: presenceDetectedPrivate,

        absenceDetected: absenceDetectedPrivate

    };
})();

module.exports = presence;
