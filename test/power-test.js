
// Unit tests for power module
var should = require('should');
var power = require('.././power');

describe('Power module', function(){

    describe('powerState', function(){
        it('should be WEAK by default', function(done){
            power.powerState.should.equal(sut.powerStates.WEAK);
            done();
        })
    })
})
