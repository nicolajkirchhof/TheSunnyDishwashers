//var Firebase = require('firebase');
//var access_token = 'c.X0MQvdyNQyflHcWILSE51xOMfnFKKLT0It2ztnhnJ1RuoUDr9ZjrinCvi1YPSTuOGJp0dXwcec12KWWccB9pihhgHKfqqYi2ZB1GTr7vlRjkXyfBl1o6qtlnYv1TzIzPq2TfvvXFDH30l9rw';
//
//var nestConnection = new Firebase('wss://developer-api.nest.com');
//
//nestConnection.authWithCustomToken(access_token, function(error, authData){
//    if(error){
//        console.log("Login to nest failed", error);
//    }
//    else {
//        console.log("Authentication success: ", authData);
//    }
//});
//
//nestConnection.on('value', function(snapshot){
//    if(snapshot.val().structures.RR7_f6h6A2g8cddNQM3yfzA_R4B7_tc2HEz2TUGLYmecWxVN8wsCqw.away == 'home'){
//        console.log("I'm Home");
//    }
//    else if(snapshot.val().structures.RR7_f6h6A2g8cddNQM3yfzA_R4B7_tc2HEz2TUGLYmecWxVN8wsCqw.away == 'away'){
//        console.log("I'm Away");
//    }else
//    {
//        console.log("I'm Auto");
//    }
//
//    //console.log(snapshot.val().);
//    //console.log(snapshot.val().devices.thermostats.DJnZnO3UMx9EI7Cbp7_ITvSkbeAyJ_95);
//})

var presence = require('./presence');
presence.onPresenceChanged(function(value){
    console.log(value);
});