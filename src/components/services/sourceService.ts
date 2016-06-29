/// <reference path="../../_references" />


// ///////////////////////////////////////////////////////////////
// --- Source Service
// ///////////////////////////////////////////////////////////////

namespace Services {
    export namespace SourceService {

        export var sourceRoomMap: _.Dictionary<Source[]>;

        export function globalBootstrap(): void {
            sourceRoomMap = _.mapValues<Room, Source[]>(Game.rooms, (room: Room): Source[] => room.find<Source>(FIND_SOURCES_ACTIVE));
        }

        export function update(): void {

        }

        export function getSourcesInRoom(roomId: string): Source[] {
            return sourceRoomMap[roomId];
        }
    }
}