var dishwasherAdapter = require('.././dishwasherAdapter');

//setTimeout( function(){
//    dishwasherAdapter.queryRemoteStateActive(function(value){
//        //if (value === 2){
//        console.log("RemoteStartActive is" + value);
//        //}
//    })}, 4000);

//setTimeout( function(){
//dishwasherAdapter.queryPowerState(function(value){
//    //if (value === 2){
//        console.log("PowerState is" + value);
//    //}
//})}, 8000);
//for (var i = 0; i<100; i++ ) {
//    var func = function(o) { return  function( ) {
//        dishwasherAdapter.sendRawCommand(500 + o);
//    }}(i);
//    setTimeout( func, 4000+2000*i);
//}

for (var i = 0; i<100; i++ ) {
    var func = function(o) { return  function( ) {
        dishwasherAdapter.sendRawCommand(552);
    }}(i);
    setTimeout( func, 4000+2000*i);
}

