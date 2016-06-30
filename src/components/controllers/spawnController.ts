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

            // this.generateSourcePaths(Services.SourceService.getAvailableSource(this.spawn.room.name));
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
            // --- Generate paths from the spawn to source;
            var startPos = this.getSpawningPoint();

            var pathTo = PathFinder.search(startPos, {pos: source.pos, range: 1}).path;

            console.log('PATH TO');
            Config.logObj(pathTo);
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