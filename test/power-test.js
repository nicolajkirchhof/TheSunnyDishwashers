
// Unit tests for power module
var should = require('should');
var power = require('.././power');

var mockLightSensor = (function () {

    return {
        setLightIntensity : null,

        onLightIntensityChanged : function(callback)
        {
            this.setLightIntensity = callback;
        }
    };
})();

describe('Power module', function(){

    describe('powerState', function(){
        it('should be WEAK by default', function(done){
            power.getPowerState().should.equal(power.powerStates.WEAK);
            done();
        })

        it('should change when light sensor sends intensity = 50', function(done){
            power.setLightSensor(mockLightSensor);
            mockLightSensor.setLightIntensity(51);

            power.getPowerState().should.equal(power.powerStates.STRONG);
            done();
        })
    })
})
