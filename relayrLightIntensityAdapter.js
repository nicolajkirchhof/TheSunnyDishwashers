/**
 * Created by fji on 28.02.2015.
 */

var relayrLightIntensityAdapter = (function () {

    var Relayr = require('relayr');

    var app_id = "790fb358-7172-4682-93d8-a079407c5cb7";
    var dev_id = "497000a7-fd33-400f-9f83-845717a6f268";
    var token  = "vlZlJC5CK.vRxapRVyd9ecP1kokpL3M6";

    // Initialise the libary

    var relayr = new Relayr(app_id);

    // Connect using the keys:
    relayr.connect(token, dev_id);

    // Listen and do stuff
console.log('registering');
    relayr.on('data', function (topic, msg) {
        //console.log(topic + ":" + msg);
        //console.log(msg);
        msg.forEach(function (elem){
           if (elem.meaning == 'luminosity'){
               changeListener(Math.round(elem.value*100/1024));
           } 
        });

    });


    // Return an object exposed to the public
    return {

        /**
         *
         * @param (function(int)) callback that receives the current intensity of detected light as a percentage. Int value between 0 and 100;
         */
        onLightIntensityChanged : function(callback)
        {
            changeListener = callback;
        }

    };
})();

module.exports = relayrLightIntensityAdapter;
