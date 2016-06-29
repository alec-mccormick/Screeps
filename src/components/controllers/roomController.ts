/// <reference path="../../_references" />

// ///////////////////////////////////////////////////////////////
// --- Room Controller
// ///////////////////////////////////////////////////////////////


namespace Controllers {
    export class RoomController {
        // ======================================================= //
        /* ********************* Variables *********************** */
        // ======================================================= //
        room: Room;
        id: string;

        get sources(): Source[] {
            return Services.SourceService.getSourcesInRoom(this.id);
        }
        get creeps(): Creep[] {
            return Services.CreepService.getCreepsInRoom(this.id);
        }
        get creepsMap(): _.Dictionary<Creep[]> {
            return Services.CreepService.getCreepsRoleMapInRoom(this.id);
        }
        get spawns(): Spawn[] {
            return Services.StorageService.getSpawnsInRoom(this.id);
        }

        // ======================================================= //
        /* ******************* Initialization ******************** */
        // ======================================================= //
        constructor(room: Room) {
            this.room = room;
            this.id = room.name;
        }

        // ======================================================= //
        /* ***************** Private Functions ******************* */
        // ======================================================= //


        // ======================================================= //
        /* ****************** Public Functions ******************* */
        // ======================================================= //
        loop(): void {

        }

        // ======================================================= //
        /* ********************* Scheduler *********************** */
        // ======================================================= //
    }
}