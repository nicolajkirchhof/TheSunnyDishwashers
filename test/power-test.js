// Unit tests for power module
var should = require('should');
var enums = require('.././enums');
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
            power.getPowerState().should.equal(enums.powerStateEnum.WEAK);
            done();
        })

        it('should be STRONG when light sensor sends intensity = 50', function(done){
            power.setLightSensor(mockLightSensor);
            mockLightSensor.setLightIntensity(50);

            power.getPowerState().should.equal(enums.powerStateEnum.STRONG);
            done();
        })

        it('should be WEAK when light sensor sends intensity = 49', function(done){
            power.setLightSensor(mockLightSensor);
            mockLightSensor.setLightIntensity(49);

            power.getPowerState().should.equal(enums.powerStateEnum.WEAK);
            done();
        })
    })

    describe('onPowerStateChanged', function(){

        var powerStateChangeCount = 0;
        var lastPowerState = enums.powerStateEnum.UNDEFINED;
        var observePowerStateChanges = function(powerState){
            powerStateChangeCount++;
            lastPowerState = powerState;
        };

        it('should be called when power state changes from WEAK to STRONG', function(done){

            power.setLightSensor(mockLightSensor);
            mockLightSensor.setLightIntensity(0);

            powerStateChangeCount = 0;
            power.onPowerStateChanged(observePowerStateChanges);

            mockLightSensor.setLightIntensity(100);

            powerStateChangeCount.should.equal(1);
            lastPowerState.should.equal(enums.powerStateEnum.STRONG);
            done();
        })

        it('should be called when power state changes from STRONG to WEAK', function(done){
            power.setLightSensor(mockLightSensor);
            mockLightSensor.setLightIntensity(100);

            powerStateChangeCount = 0;
            power.onPowerStateChanged(observePowerStateChanges);

            mockLightSensor.setLightIntensity(0);

            powerStateChangeCount.should.equal(1);
            lastPowerState.should.equal(enums.powerStateEnum.WEAK);
            done();
        })

        it('should not be called when power state does not change (STRONG to STRONG)', function(done){
            power.setLightSensor(mockLightSensor);

            // Start with 90...
            mockLightSensor.setLightIntensity(90);

            powerStateChangeCount = 0;
            power.onPowerStateChanged(observePowerStateChanges);

            // then move to 80: that should not trigger the event.
            mockLightSensor.setLightIntensity(80);

            powerStateChangeCount.should.equal(0);

            done();
        })
    })
})
