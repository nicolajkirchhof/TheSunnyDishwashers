
// The MIGHTY MIGHTY SUNNY DISHWASHER

// For production run, DI-integrate the modules.
// ----------
// presence
var presence = require('./presence');

// power
var lightSensor = require('./relayrLightIntensityAdapter');
var power = require('./power');
power.setLightSensor(lightSensor);

// dishwasher
var dishWasherApplianceAdapter = require('./dishwasherAdapter');
var dishWasher = require('./dishwasher');
dishWasher.setApplianceAdapter(dishWasherApplianceAdapter);
dishWasher.setPower(power);
dishWasher.setPresence(presence);

