var enums = require('./enums.js');

var power = (function () {

  var MIN_STRONG_LIGHT_INTENSITY = 50;

  var powerStateChangedCallback;
  var currentPowerState = enums.powerStateEnum.WEAK;

  var setLightIntensity = function(lightIntensity) {

      // Enough light for strong power output?
      var newPowerState =  enums.powerStateEnum.WEAK;
      if(MIN_STRONG_LIGHT_INTENSITY <= lightIntensity) newPowerState = enums.powerStateEnum.STRONG;

      if (newPowerState === currentPowerState) return;
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
        onPowerstateChanged: function(callback) {
          powerStateChangedCallback = callback;
        },

        getPowerState: function() { return currentPowerState }
  };
})();

module.exports = power;