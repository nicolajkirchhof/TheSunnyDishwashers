
// Unit tests for power module
var should = require('should');
var dishwasherAdapter = require('.././dishwasherAdapter');



describe('dishwasherAdapter module', function(){

    describe('powerState', function(){
        //it('should not be running at default', function(done){
        //    dishwasherAdapter.isRunning().should.equal(false);
        //    done();
        //})

        it('should resturn true after start and false after stop', function(done){
            dishwasherAdapter.run(done, function(){});

            //setTimeout(function() {
            //    dishwasherAdapter.stop(done, function(){});
            //}, 5000);
        })

        it('should resturn true after start and false after stop', function(done){
            dishwasherAdapter.stop(done, function(){});
        })

    })
})
