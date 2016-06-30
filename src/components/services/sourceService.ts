/// <reference path="../../_references" />


// ///////////////////////////////////////////////////////////////
// --- Source Service
// ///////////////////////////////////////////////////////////////

namespace Services {
    export namespace SourceService {

        export var sourceRoomMap: _.Dictionary<Source[]>;
        export var creepSourceMap: _.Dictionary<Creep[]>;

        function initMemory() {
            if(!Memory.sources) {
                Memory.sources = {};
            }

            _.forEach(sourceRoomMap, sources => _.forEach(sources, source => {
                if(!Memory.sources[source.id]) {
                    Memory.sources[source.id] = {
                        numHaulers: 1,
                        harvestPositions: source.pos.getSurroundingWalkablePositions()
                    };
                }
            }));
        }

        export function globalBootstrap(): void {
            sourceRoomMap = _.mapValues<Room, Source[]>(Game.rooms, (room: Room): Source[] => room.find<Source>(FIND_SOURCES_ACTIVE));
            creepSourceMap = {};

            initMemory();
        }

        function updateCreepSourceMap(): void {
            creepSourceMap = {};

            _.forEach(CreepService.creeps, creep => {
                var id = creep.memory['targetId'];

                if(id && sourceRoomMap[creep.room.name][id]) {
                    // creep is targetting a source
                    if(!creepSourceMap[id]) {
                        creepSourceMap[id] = [];
                    }

                    creepSourceMap[id].push(creep);
                }
            });
        }

        export function update(): void {
            // updateCreepSourceMap()
        }

        export function getSourcesInRoom(roomId: string): Source[] {
            return sourceRoomMap[roomId];
        }

        export function getAvailableSource(roomId: string): Source {
            // TODO
            return sourceRoomMap[roomId][0];
        }
    }
}