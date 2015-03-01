
// Integration tests for the dishwasher module, pushing through to the physical divice
// via the adapter.
var dishwasherAdapter = require('../dishwasherAdapter');
var dishwasher = require('../dishwasher');

describe('dishwasher integration tests', function(){

    var mockPower = (function () {

        return {
            setPowerState : null,

            onPowerStateChanged : function(callback)
            {
                this.setPowerState = callback;
            }
        };
    })();

    var mockPresence = (function () {

        return {
            setPresence : null,

            onPresenceChanged : function(callback)
            {
                this.setPresence = callback;
            }
        };
    })();

    describe('Starting the dishwasher', function() {
        this.timeout(60000);

        // Set up with mocked sensors and the actual appliance adapter
        dishwasher.setPower(mockPower);
        dishwasher.setPresence(mockPresence);
        dishwasher.setApplianceAdapter(dishwasherAdapter);

        it('should run and then abort the dishwasher (observe manually - should complete within 30s) ', function (done) {
            // Trigger the thing to run - but first, we need to give the adapter some time to
            // connect.
            setTimeout(function(){
               mockPresence.setPresence(true);
            }, 1000);

            // Wait 30 seconds. YOU go and observe that dishwasher.
            setTimeout(function() {done}, 30000);
        });
    });
});
