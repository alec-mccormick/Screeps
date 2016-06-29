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
        }

        export function update(): void {
            creepsRoomMap = _.groupBy<Creep>(creeps, c => c.room.name);

            creepsRoleMap = _.mapValues<Creep[], _.Dictionary<Creep[]>>(creepsRoomMap, creeps => _.groupBy<Creep>(creeps, c => c.memory['role']));
        }

        export function getCreepsInRoom(roomId: string): Creep[] {
            return creepsRoomMap[roomId];
        }
        export function getCreepsRoleMapInRoom(roomId: string): _.Dictionary<Creep[]> {
            return creepsRoleMap[roomId];
        }

        export function getCreepsInRoomWithRole(roomId: string, role: string): Creep[] {
            return creepsRoleMap[roomId][role];
        }
    }
}