/// <reference path="../../_references" />

// ============================================================================== //
/* ******************************** Game Manager ******************************** */
// ============================================================================== //

namespace Managers {
    export namespace GameManager {

        export var sampleVariable: string = "This is public variable";

        export var roomControllers: Controllers.RoomController[];
        export var services: Interfaces.IService[];
        export var creepActions: _.Dictionary<Interfaces.ICreepAction>;

        function indexBy<T>(arr: T[], fnc): _.Dictionary<T> {
            var obj: _.Dictionary<T> = {};

            arr.forEach(item => {
                obj[fnc(item)] = item;
            });

            return obj;
        }

        function initVariables() {
            services = _.values<Interfaces.IService>(Services);


            var temp = _.filter<Interfaces.ICreepAction>(<any>Actions, a => _.isString(a.role));

            creepActions = indexBy<Interfaces.ICreepAction>(temp, a => a.role);
        }

        export function globalBootstrap() {
            if(Config.Verbose) {
                console.log("--- New global. Running globalBootstrap() ---");
            }

            // --- Init variables
            initVariables();

            // --- Run Service bootstraps
            services.forEach(service => service.globalBootstrap());


            // --- Initialize room controllers
            roomControllers = _.map(Game.rooms, room => new Controllers.RoomController(room));
        }

        export function loop() {
            if(Config.Verbose) {
                console.log("--- loop() ---");
            }

            // --- Update services
            services.forEach(service => service.update());


            // --- Run controller for each room
            roomControllers.forEach(room => room.loop());
        }
    }
}