
// Unit tests for power module
var should = require('should');
var presence = require('.././presence');

var mockNestAdapter = (function () {

    var receiver = null;

    /**/    // Return an object exposed to the public
    return {

        onPresenceUpdate: function(listener){
            receiver = listener;
        },

        callPresenceDetected: function(){
            if(receiver !== null)
            {
                receiver.presenceDetected();
            }
        },

        callAbsenceDetected: function(){
            if(receiver !== null)
            {
                receiver.absenceDetected();
            }
        }


    };
})();
describe('Presence module', function(){

    describe('onPresenceChanged', function(){
        it('should forward presence detected event', function(done){
            presence.registerPresenceProvider(mockNestAdapter);
            presence.onPresenceChanged(function(state){
                if (state === true){
                    done();
                }
                else{
                    error("Failed");
                }
            });
            mockNestAdapter.callPresenceDetected();
        });

        it('should forward presence detected event', function(done){
            presence.registerPresenceProvider(mockNestAdapter);
            presence.onPresenceChanged(function(state){
                if (state === false){
                    done();
                }
                else{
                    error("Failed");
                }
            });
            mockNestAdapter.callAbsenceDetected();
        });

    });
});
