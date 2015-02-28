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

exports.applianceDirectiveEnum = {
    // dunno. Used to detect uninitialized state
    UNDEFINED : 0,

    // Do not start the appliance yet
    WAIT : 1,

    // Start the thing, go go go!
    RUN : 2
};