/// <reference path="../../_references" />

// ///////////////////////////////////////////////////////////////
// --- Creep Service
// ///////////////////////////////////////////////////////////////

namespace Services {
    export namespace CreepService {

        export var creeps: _.Dictionary<Creep>;
        export var creepsRoomMap: _.Dictionary<Creep[]>;
        export var creepsRoleMap: _.Dictionary<_.Dictionary<Creep[]>>;

        export function globalBootstrap(): void {
            creeps = Game.creeps;
            creepsRoomMap = {};
            creepsRoleMap = {};
        }

        export function update(): void {
            creepsRoomMap = _.groupBy<Creep>(creeps, c => c.room.name);

            creepsRoleMap = _.mapValues<Creep[], _.Dictionary<Creep[]>>(creepsRoomMap, creeps => _.groupBy<Creep>(creeps, c => c.memory['role']));
        }

        export function getCreepsInRoom(roomId: string): Creep[] {
            if(!creepsRoomMap[roomId]) {
                creepsRoomMap[roomId] = [];
            }

            return creepsRoomMap[roomId];
        }
        export function getCreepsRoleMapInRoom(roomId: string): _.Dictionary<Creep[]> {
            if(!creepsRoleMap[roomId]) {
                creepsRoleMap[roomId] = {};
            }

            return creepsRoleMap[roomId];
        }

        export function getCreepsInRoomWithRole(roomId: string, role: string): Creep[] {
            if(!creepsRoleMap[roomId]) {
                creepsRoleMap[roomId] = {};
            }

            if(!creepsRoleMap[roomId][role]) {
                creepsRoleMap[roomId][role] = [];
            }

            return creepsRoleMap[roomId][role];
        }

        // export function getAllCreepsWithRole(role: string): _.Dictionary<Creep[]> {
        // }
    }
}