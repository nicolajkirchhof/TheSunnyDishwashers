var Relayr = require('relayr');

var app_id = "790fb358-7172-4682-93d8-a079407c5cb7";
var dishwasher01_id = "e7ad3208-59d6-4757-bced-ba3d77c9274e";
var token = "vlZlJC5CK.vRxapRVyd9ecP1kokpL3M6";
var command_power_on = {"path": "power_unit", "command": "power", "value": 2};
var command_power_off = {"path": "power_unit", "command": "power", "value": 1};

// Initialise the libary
var relayr = new Relayr(app_id);

// Connect using the keys:
relayr.connect(token, dishwasher01_id);

var commandTestFun = function (err, user) {
    console.log(err || user);
    if (err === null){
        console.log("WORKS");
    }
    else {
        console.log("ERROR");
    }
};

relayr.command(token, dishwasher01_id, command_power_on, commandTestFun);

var command_programme_as_default = {"path": "programme", "command": "eco_as_default", "value": 1};
relayr.command(token, dishwasher01_id, command_programme_as_default, commandTestFun);

var command_programme_hygine = {"path": "programme", "command": "hygiene_plus", "value": true};
relayr.command(token, dishwasher01_id, command_programme_hygine, commandTestFun);

var command_programme_brilliance = {"path": "programme", "command": "brilliance_dry", "value": true};
relayr.command(token, dishwasher01_id, command_programme_brilliance, commandTestFun);

var command_programme_brilliance_off = {"path": "programme", "command": "brilliance_dry", "value": false};
relayr.command(token, dishwasher01_id, command_programme_brilliance_off, commandTestFun);


