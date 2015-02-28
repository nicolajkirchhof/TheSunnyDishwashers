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
            dishWasher.setPower(mockPower);

            mockPresence.setPresence(false);
            mockPresence.setPresence(true);

            dishWasher.getDirective().should.equal(enums.applianceDirectiveEnum.RUN);
            done();
        })
    })
})
