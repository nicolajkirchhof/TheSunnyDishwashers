var nestAdapter = require('../nestAdapter');
nestAdapter.onPresenceUpdate({
    presenceDetected: function(){console.log("PRESENT!")},
    absenceDetected: function(){console.log("ABSENT!")}
})