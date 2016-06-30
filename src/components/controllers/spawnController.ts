/// <reference path="../../_references" />

// ///////////////////////////////////////////////////////////////
// --- Spawn Controller
// ///////////////////////////////////////////////////////////////

namespace Controllers {
    export class SpawnController implements Interfaces.IController {
        // ======================================================= //
        /* ********************* Variables *********************** */
        // ======================================================= //
        spawn: Spawn;
        id: string;
        roomController: RoomController;

        get harvesters(): Creep[] {
            return this.roomController.getCreepsWithRole('harvester');
        }
        get builders(): Creep[] {
            return this.roomController.getCreepsWithRole('builder');
        }
        get upgraders(): Creep[] {
            return this.roomController.getCreepsWithRole('upgrader');
        }

        // ======================================================= //
        /* ******************* Initialization ******************** */
        // ======================================================= //
        constructor(spawn: Spawn, roomController: RoomController) {
            this.spawn = spawn;
            this.id = spawn.id;

            this.roomController = roomController;

            if(!this.spawn.memory.sourcePaths) {
                this.spawn.memory.sourcePaths = {};
            }
            //this.generateSourcePaths(Services.SourceService.getAvailableSource(this.spawn.room.name));
            this.generateAllSourcePaths();
        }

        // ======================================================= //
        /* ***************** Private Functions ******************* */
        // ======================================================= //
        canCreateCreep(body: string[]): number {
            return this.spawn.canCreateCreep(body);
        }
        getBody(role: string): string[] {
            return Managers.GameManager.creepActions[role].body;
        }
        getSpawningPoint(): RoomPosition {
            return this.spawn.room.getPositionAt(this.spawn.pos.x, this.spawn.pos.y - 1);
        }




        generateAllSourcePaths(): void {
            // --- Generate paths from the spawn to each source in the same room
            var sources = Services.SourceService.getSourcesInRoom(this.spawn.room.name);

            _.forEach(sources, this.generateSourcePaths.bind(this));
        }
        generateSourcePaths(source: Source): void {
            var harvestPositions = Memory.sources[source.id].harvestPositions;

            harvestPositions.forEach(pos => {
                var key = pos.x + ',' + pos.y;

                if(!this.spawn.memory.sourcePaths[key]) {
                    var path = this.generatePath(pos);

                    this.spawn.memory.sourcePaths[key] = Room.serializePath(path);
                }
            });
        }
        generatePath(pos: Interfaces.IStoredRoomPosition): PathStep[] {
            // --- Generate paths from the spawn to source;

            // return PathFinder.search()
            return this.spawn.pos.findPathTo(RoomPosition.prototype.clone.call(pos));
        }
        // ======================================================= //
        /* ****************** Public Functions ******************* */
        // ======================================================= //
        loop(): void {
            // console.log(this.roomController.getCreepsWithRole('harvester'));

            // if(this.canCreateCreep(this.getBody('harvester')) === OK && this.harvesters.length < 1) {
            //     Config.log('Creating Harvester');
            //
            //     this.spawn.createCreep(this.getBody('harvester'), null, {
            //         role: 'harvester',
            //         orderQueue: []
            //     });
            // }
        }

        // ======================================================= //
        /* ********************* Scheduler *********************** */
        // ======================================================= //

    }
}