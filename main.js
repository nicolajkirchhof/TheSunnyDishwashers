// ==========
// The MIGHTY MIGHTY SUNNY DISHWASHER's bootstrap module.
// ==========

// ----------
// For production run, DI-integrate the modules.
// ----------
// presence
var nest = require('./nestAdapter');
var presence = require('./presence');
presence.registerPresenceProvider(nest);

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

// ----------
// Start web service to provide status info
// ----------
var webservice = require('./webservice/webapp');
webservice.start();
