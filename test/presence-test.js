
// Unit tests for power module
var should = require('should');
var presence = require('.././presence');

var mockLightSensor = (function () {

    return {
        setLightIntensity : null,

        onLightIntensityChanged : function(callback)
        {
            this.setLightIntensity = callback;
        }
    };
})();

describe('Presence module', function(){

    describe('onPresenceChanged', function(){
        it('should be false at begin', function(done){
            presence.isPresent().should.equal(false);
            done();
        })

        it('should not notify if state does not change', function(done){
            var mockFun = function(state){if (state){done()}};
            presence.onPresenceChanged(mockFun);
            presence.presenceDetected();
        })

        //it('should be WEAK by default', function(done){
        //    power.getPowerState().should.equal(power.powerStates.WEAK);
            //done();
        //})

        //it('should change when light sensor sends intensity = 50', function(done){
        //    power.setLightSensor(mockLightSensor);
        //    mockLightSensor.setLightIntensity(51);
        //
        //    power.getPowerState().should.equal(power.powerStates.STRONG);
        //    done();
        //})
    })
})
