/// <reference path="../../_references" />

// ///////////////////////////////////////////////////////////////
// --- Storage Service
// ///////////////////////////////////////////////////////////////

namespace Services {
    export namespace StorageService {

        export var spawns: _.Dictionary<Spawn>;
        export var spawnsRoomMap: _.Dictionary<Spawn[]>;

        export function globalBootstrap(): void {
            spawns = Game.spawns;
            spawnsRoomMap = _.groupBy<Spawn>(spawns, s => s.room.name);
        }

        export function update(): void {

        }

        export function getSpawnsInRoom(roomId: string): Spawn[] {
            return spawnsRoomMap[roomId];
        }
        export function getDropOffContainer(roomId: string): Spawn | Container {
            return spawnsRoomMap[roomId][0];
        }

        // export function getAvailableSpawner(roomId: string, body: string[]): Spawn {
        //     var spawns = spawnsRoomMap[roomId];
        //
        //     for(var i = 0, len = spawns.length; i < len; i++) {
        //         if(spawns[i].canCreateCreep(body)) {
        //             return spawns[i];
        //         }
        //     }
        //
        //     return null;
        // }
        
    }
}