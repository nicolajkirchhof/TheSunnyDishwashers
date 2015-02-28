/**
 * Created by heg on 28.02.2015.
 */
// Unit tests for power module
var should = require('should');
var enums = require('.././enums');
var dishWasher = require('.././dishwasher');

describe('DishWasher module', function(){

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

    var mockAppliance = (function () {

        return {
            runCount : 0,
            willFail : false,

            reset : function() {
                this.runCount = 0;
                this.willFail = false;
            },

            run : function(success, fail)
            {
                this.runCount++;
                if (this.willFail) {
                    if (fail) fail();
                }
                else
                {
                    if (success) success();
                }
            }
        };
    })();

    describe('appliance directive', function(){
        it('should be WAIT by default', function(done){
            dishWasher.getDirective().should.equal(enums.applianceDirectiveEnum.WAIT);
            done();
        }),

        it('should RUN when power is STRONG', function(done){
            dishWasher.setPower(mockPower);

            mockPower.setPowerState(enums.powerStateEnum.STRONG);

            dishWasher.getDirective().should.equal(enums.applianceDirectiveEnum.RUN);
            done();
        }),

        it('should WAIT when power is WEAK', function(done) {
            dishWasher.setPower(mockPower);

            mockPower.setPowerState(enums.powerStateEnum.WEAK);

            dishWasher.getDirective().should.equal(enums.applianceDirectiveEnum.WAIT);
            done();
        }),

        it('should continue to RUN when power changes from STRONG to WEAK', function(done) {
            dishWasher.setPower(mockPower);

            mockPower.setPowerState(enums.powerStateEnum.STRONG);
            mockPower.setPowerState(enums.powerStateEnum.WEAK);

            dishWasher.getDirective().should.equal(enums.applianceDirectiveEnum.RUN);
            done();
        }),

        it('should RUN when presence is detected', function(done){
            dishWasher.setPresence(mockPresence);

            mockPresence.setPresence(true);

            dishWasher.getDirective().should.equal(enums.applianceDirectiveEnum.RUN);
            done();
        }),

        it('should WAIT when no presence is detected', function(done){
            dishWasher.setPresence(mockPresence);

            mockPresence.setPresence(false);

            dishWasher.getDirective().should.equal(enums.applianceDirectiveEnum.WAIT);
            done();
        }),

        it('should continue to RUN when presence changes', function(done) {
            dishWasher.setPresence(mockPresence);

            mockPresence.setPresence(false);
            mockPresence.setPresence(true);

            dishWasher.getDirective().should.equal(enums.applianceDirectiveEnum.RUN);
            done();
        })
    }),

    describe('appliance communication', function() {
        it('should tell the appliance to run when presence changes', function(done) {
            mockAppliance.reset();

            dishWasher.setPresence(mockPresence);
            dishWasher.setApplianceAdapter(mockAppliance);

            mockPresence.setPresence(true);

            mockAppliance.runCount.should.equal(1);
            done();
        })
    })
})
