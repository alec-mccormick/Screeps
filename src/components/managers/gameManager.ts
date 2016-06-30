/// <reference path="../../_references" />

// ============================================================================== //
/* ******************************** Game Manager ******************************** */
// ============================================================================== //

namespace Managers {
    export namespace GameManager {

        export var sampleVariable: string = "This is public variable";

        export var roomControllers: Controllers.RoomController[];
        export var services: Interfaces.IService[];
        export var creepActions: _.Dictionary<Interfaces.IAction>;

        function indexBy<T>(arr: T[], fnc): _.Dictionary<T> {
            var obj: _.Dictionary<T> = {};
            arr.forEach(item => obj[fnc(item)] = item);
            return obj;
        }

        function initVariables() {
            services = _.values<Interfaces.IService>(Services);

            var temp = _.filter<Interfaces.IAction>(<any>Actions, a => _.isString(a.role));

            creepActions = indexBy<Interfaces.IAction>(temp, a => a.role);
        }

        export function globalBootstrap() {
            // Config.log("--- New global. Running globalBootstrap() ---");
            Config.LibraryModifications.globalBootstrap();

            // --- Init variables
            initVariables();

            // --- Run Service bootstraps
            services.forEach(service => service.globalBootstrap());

            // --- Initialize room controllers
            roomControllers = _.map(Game.rooms, room => new Controllers.RoomController(room));

            // --- Init memory
        }

        export function loop() {
            PathFinder.use(true);

            // --- Update services
            services.forEach(service => service.update());

            // --- Run controller for each room
            roomControllers.forEach(room => room.loop());
        }

        // ======================================================= //
        /* **************** Simulation Functions ***************** */
        // ======================================================= //
        export function createHarvester() {
            var controller = this.roomControllers[0];
            var spawnController = controller.spawnControllers[0];

            spawnController.spawn.createCreep(spawnController.getBody('harvester'), null, {
                role: 'harvester',
                orderQueue: []
            })
        }

        export function generateSourcePaths() {
            var controller = this.roomControllers[0];
            var spawnController = controller.spawnControllers[0];
            
            
        }

        export function addFlags() {
            
        }

        export function mining() {
            var controller = this.roomControllers[0];
            var spawnController = controller.spawnControllers[0];
            var sources = Services.SourceService.getSourcesInRoom(controller.id);

            var source = sources[0];

            // var miningPositions = source.pos.getSurroundingWalkablePositions();
            var harvestPositions = Memory.sources[source.id].harvestPositions;

            harvestPositions.forEach(pos => {
                var path = spawnController.generatePath(pos);
                
                console.log('PATH');
                console.log(JSON.stringify(path));
            });
        }
    }
}























