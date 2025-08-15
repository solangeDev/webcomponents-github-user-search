const { createDefaultPreset } = require("ts-jest");

module.exports = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            useESM: true
        }
    },
    extensionsToTreatAsEsm: ['.ts'],
};