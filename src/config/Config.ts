/// <reference path="../_references" />

// ///////////////////////////////////////////////////////////////
// --- Config
// ///////////////////////////////////////////////////////////////

namespace Config {

    export var Verbose: boolean = true;

    export var Errors = {
        0: 'OK',
        '-1': 'ERR_NOT_OWNER',
        '-2': 'ERR_NO_PATH',
        '-3': 'ERR_NAME_EXISTS',
        '-4': 'ERR_BUSY',
        '-5': 'ERR_NOT_FOUND',
        '-6': 'ERR_NOT_ENOUGH_ENERGY',
        '-7': 'ERR_INVALID_TARGET',
        '-8': 'ERR_FULL',
        '-9': 'ERR_NOT_IN_RANGE',
        '-10': 'ERR_INVALID_ARGS',
        '-11': 'ERR_TIRED',
        '-12': 'ERR_NO_BODYPART',
        '-14': 'ERR_RCL_NOT_ENOUGH',
        '-15': 'ERR_GCL_NOT_ENOUGH',
        '-99': 'ERR_ACTION_DOES_NOT_EXIST'
    };

    export var Obstacles: _.Dictionary<boolean> = {};
    _.forEach(OBSTACLE_OBJECT_TYPES, key => Obstacles[key] = true);


    export function log(...args) {
        if(Verbose) {
            console.log.apply(console, args);
        }
    }

    export function error(...args) {
        console.log.apply(console, args);
    }

    export function logObj(obj) {
        if(Verbose) {
            console.log(JSON.stringify(obj));
        }
    }


    export enum ErrorCodes {
        ERR_ACTION_DOES_NOT_EXIST = -99,
        END_OF_PATH = 1
    }
}