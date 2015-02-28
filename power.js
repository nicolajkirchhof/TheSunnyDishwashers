var power = (function () {

  var powerStateEnum = {
      STRONG : 1,
      WEAK : 2
    };

  var MIN_STRONG_LIGHT_INTENSITY = 50;

  var powerStateChangedCallback;
  var powerState = powerStateEnum.WEAK;

  var setLightIntensity = function(lightIntensity) {
     
      // Enough light for strong power output?
      var newPowerState = lightIntensity < MIN_STRONG_LIGHT_INTENSITY ? powerStateEnum.STRONG : powerStateEnum.WEAK;
     
      // Change in state?
      if (newPowerState == powerState) return;

      // well then... announce new power state.
      if (!powerStateChangedCallback) return;
      powerStateChangedCallback(newPowerState);
    };

  return {
    // DI: light sensor adapter
    setLightSensor: function(lightSensor) {
      lightSensor.onLightIntensityChanged = function(lightIntensity) {
        setLightIntensity(lightIntensity);       
      };
    },

    // Callback for power state changes
    onPowerstateChanged: function(callback) {
      powerStateChangedCallback = callback;
    },

    // Enum for states
    powerState: powerState
  };
})();

module.exports = power;