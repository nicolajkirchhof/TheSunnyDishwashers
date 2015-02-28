var express=require('express');
var status = require('./status');
var app=express();

// --------------
// Implements a basic web service and SPA to monitor the S.D.'s status
// --------------

// Routing
app.get('/',function(req,res){
    res.send('SPA HTML goes here');
});

app.get('/status', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(status.getUpdate());
});

// Let the main app start the server
module.exports.start = function() {
    var server = app.listen(3000, function () {
        console.log("WEBSERVICE Sunny Dishwasher Status listening on port 3000");
    });
};
