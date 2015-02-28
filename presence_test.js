p = undefined;
var p = require("./presence");
p.onPresenceChanged(function(isPres){ console.log("Presence =" + isPres);});
p.presenceDetected();
p.absenceDetected();

