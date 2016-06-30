/// <reference path="../../_references" />

// ///////////////////////////////////////////////////////////////
// --- Room Controller
// ///////////////////////////////////////////////////////////////


namespace Controllers {
    export class RoomController implements Interfaces.IController {
        // ======================================================= //
        /* ********************* Variables *********************** */
        // ======================================================= //
        room: Room;
        id: string;
        spawnControllers: SpawnController[];

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

            this.spawnControllers = this.spawns.map(s => new SpawnController(s, this));
        }

        // ======================================================= //
        /* ***************** Private Functions ******************* */
        // ======================================================= //
        // getAction(creep: Creep): Interfaces.IAction {
        //     return Managers.GameManager.creepActions[creep.memory.role];
        // }


        // ======================================================= //
        /* ****************** Public Functions ******************* */
        // ======================================================= //
        loop(): void {
            _.invoke(this.spawnControllers, 'loop');
            
            _.forEach(this.creeps, c => {
                if(!c.spawning) {
                    c.run();
                }
            })
        }

        getCreepsWithRole(role: string): Creep[] {
            // console.log('get creeps', role, this.id);

            return Services.CreepService.getCreepsInRoomWithRole(this.id, role);
        }

        // ======================================================= //
        /* ********************* Scheduler *********************** */
        // ======================================================= //
    }
}