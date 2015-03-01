// --------------
// Procides non-magic constant values for usage throughout the application.
// --------------

exports.powerStateEnum = {
    // dunno. Used to detect uninitialized state
    UNDEFINED : 0,

    // Strong power from renewable energy available.
    STRONG : 2,

    // Low / no power from renewable energy available.
    WEAK : 1
};

// Describes the desired state of an appliance - which might be different from its current state
exports.applianceDirectiveEnum = {
    // dunno. Used to detect uninitialized state
    UNDEFINED : 0,

    // Do not start the appliance yet
    WAIT : 1,

    // Start the thing, go go go!
    RUN : 2,

    // Stop running
    ABORT : 3
};