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

    var Firebase = require('firebase');
    var access_token = 'c.X0MQvdyNQyflHcWILSE51xOMfnFKKLT0It2ztnhnJ1RuoUDr9ZjrinCvi1YPSTuOGJp0dXwcec12KWWccB9pihhgHKfqqYi2ZB1GTr7vlRjkXyfBl1o6qtlnYv1TzIzPq2TfvvXFDH30l9rw';

    var nestConnection = new Firebase('wss://developer-api.nest.com');

    nestConnection.authWithCustomToken(access_token, function(error, authData){
        if(error){
            console.log("Login to nest failed", error);
        }
        else {
            console.log("Authentication success: ", authData);
        }
    });

    nestConnection.on('value', function(snapshot){
        if(snapshot.val().structures.RR7_f6h6A2g8cddNQM3yfzA_R4B7_tc2HEz2TUGLYmecWxVN8wsCqw.away == 'home'){
            console.log("I'm Home");
            presenceDetectedPrivate();
        }
        else if(snapshot.val().structures.RR7_f6h6A2g8cddNQM3yfzA_R4B7_tc2HEz2TUGLYmecWxVN8wsCqw.away == 'away'){
            console.log("I'm Away");
            absenceDetectedPrivate();
        }else
        {
            console.log("I'm Auto");
        }

        //console.log(snapshot.val().);
        //console.log(snapshot.val().devices.thermostats.DJnZnO3UMx9EI7Cbp7_ITvSkbeAyJ_95);
    })


    /**/    // Return an object exposed to the public
    return {

        // Add items to our basket
        onPresenceChanged: function (notifier) {
            callback = notifier;
        },

        isPresent: function (){
            return isPresent;
        },

        // Public alias to a  private function
        presenceDetected: presenceDetectedPrivate,

        absenceDetected: absenceDetectedPrivate

    };
})();

module.exports = presence;
