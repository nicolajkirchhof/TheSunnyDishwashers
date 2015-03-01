
// Unit tests for power module
var should = require('should');
var dishwasherAdapter = require('../dishwasherAdapter');



describe('dishwasherAdapter module', function(){

    describe('powerState', function(){
        //it('should return true after start and false after stop', function(done){
        //
        //    var runSuccess = false;
        //    dishwasherAdapter.run(function(){runSuccess = true;}, function(){});
        //
        //    setTimeout(function() {
        //        dishwasherAdapter.abort(done, function(){});
        //    }, 10000);
        //})

        it('should return boolean for power state', function(done){

            dishwasherAdapter.queryPowerState(function(value){
                if (typeof(value) == 'boolean'){
                    done();
                }
            })
        })


        //it('should return true after start and false after stop', function(done){
        //    dishwasherAdapter.stop(done, function(){});
        //})

    })
})
