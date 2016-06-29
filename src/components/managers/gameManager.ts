/// <reference path="../../_references" />

// ============================================================================== //
/* ******************************** Game Manager ******************************** */
// ============================================================================== //

namespace Managers {
    export namespace GameManager {

        export var sampleVariable: string = "This is public variable";

        export var roomControllers: Controllers.RoomController[];

        export function globalBootstrap() {
            if(Config.Verbose) {
                console.log("--- New global. Running globalBootstrap() ---");
            }

            // --- Run Service bootstraps
            Services.CreepService.globalBootstrap();
            Services.SourceService.globalBootstrap();
            Services.StorageService.globalBootstrap();
            Services.StructureService.globalBootstrap();


            // --- Initialize room controllers
            roomControllers = _.map(Game.rooms, room => new Controllers.RoomController(room));
        }

        export function loop() {
            if(Config.Verbose) {
                console.log("--- loop() ---");
            }

            // --- Update services
            Services.CreepService.update();
            Services.SourceService.update();
            Services.StorageService.update();
            Services.StructureService.update();

            // --- Run controller for each room
            roomControllers.forEach(room => room.loop());
        }
    }
}