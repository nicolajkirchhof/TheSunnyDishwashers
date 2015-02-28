// -------------
// Implements an abstract controller that provides the application
// with the information how the status of the renewable power
// is.
// The controller is reactive: is accepts callbacks from the connected
// sensors and raises events accordingly.
// The current implementation uses the light sensor and quite dumbly
// assumes that power is STRONG when it reports more than 50% of
// light intensity.
// --------------

var enums = require('./enums.js');

var power = (function () {

  var MIN_STRONG_LIGHT_INTENSITY = 50;

  var powerStateChangedCallback;
  var currentPowerState = enums.powerStateEnum.WEAK;

  var setLightIntensity = function(lightIntensity) {

      console.log('POWER light intensity is ', lightIntensity);

      // Enough light for strong power output?
      var newPowerState =  enums.powerStateEnum.WEAK;
      if(MIN_STRONG_LIGHT_INTENSITY <= lightIntensity) newPowerState = enums.powerStateEnum.STRONG;

      if (newPowerState === currentPowerState) return;

      console.log('POWER state changed from {0} to {1}', currentPowerState, newPowerState);
      currentPowerState = newPowerState;

      // well then... announce new power state.
      if (!powerStateChangedCallback) return;
      powerStateChangedCallback(newPowerState);
    };

    return {
        // DI: light sensor adapter
        setLightSensor: function(lightSensor) {
          lightSensor.onLightIntensityChanged(function(lightIntensity) {
            setLightIntensity(lightIntensity);
          });
        },

        // Callback for power state changes
        onPowerStateChanged: function(callback) {
          powerStateChangedCallback = callback;
        },

        getPowerState: function() { return currentPowerState }
  };
})();

module.exports = power;