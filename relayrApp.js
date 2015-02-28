// ------------
// Connects to the relayr sensor cloud.
// THIS CONTAINS THE RELAYR DEV ACCOUNT KEYS. If you plan to use
// this outside a hackathon event - well - you might consider
// putting them somewhere safe.
// ------------

var Relayr = require('relayr');

// Connects to the Relayr cloud. We also collect all the keys here
var relayr = (function(){
    var appId = "790fb358-7172-4682-93d8-a079407c5cb7";
    var relayrApp = new Relayr(appId);

    return {
        authToken : "vlZlJC5CK.vRxapRVyd9ecP1kokpL3M6",
        wunderbarId : "f924183e-c786-4064-8707-accd2fa50c4a",
        dishwasherId : "e7ad3208-59d6-4757-bced-ba3d77c9274e",
        app : relayrApp
    };
})();

module.exports = relayr;
