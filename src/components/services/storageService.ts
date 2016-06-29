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

        export function getSpawnsInRoom(room: string): Spawn[] {
            return spawnsRoomMap[room];
        }
        
    }
}