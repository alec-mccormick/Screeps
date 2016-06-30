/// <reference path="../../_references" />


// ///////////////////////////////////////////////////////////////
// --- Harvester Action
// ///////////////////////////////////////////////////////////////

namespace Actions {
    export namespace Harvester {

        export var body: string[] = [WORK, CARRY, MOVE];
        export var role: string = 'harvester';

        export function run(creep: Creep) {

            if(creep.carry.energy === creep.carryCapacity) {
                if(creep.memory.orderQueue.length === 0) {
                    creep.memory.orderQueue.unshift(creep.memory.activeOrder);
                }

                creep.memory.activeOrder = {
                    action: 'transfer',
                    targetId: Services.StorageService.getDropOffContainer(creep.room.name).id,
                    args: [RESOURCE_ENERGY],
                    moveTo: true
                };
            } else if(!creep.memory.activeOrder && creep.memory.orderQueue.length === 0) {

                creep.memory.activeOrder = {
                    action: 'harvest',
                    targetId: Services.SourceService.getAvailableSource(creep.room.name).id,
                    args: [],
                    moveTo: true
                };
            }
        }

        export namespace resultHandlers {

            export function harvest(creep: Creep, err: number) {

                if(err !== OK) {
                    Config.error(`!!! Error: ${Config.Errors[err]} while harvesting. On creep: ${creep.name}`);
                }
            }

            export function transfer(creep: Creep, err: number) {
                if(err === OK) {
                    creep.clearActiveOrder();
                } else {
                    Config.error(`!!! Error: ${Config.Errors[err]} transferring. On creep: ${creep.name}`);
                }
            }

            export function moveByPath(creep: Creep, err: number) {
                Config.error(`!!! Error: ${Config.Errors[err]} in move by path. On creep: ${creep.name}`);

                if(err === OK) {
                    // var path = creep.memory.activeOrder.args[0];
                    // if(path.length <= 5) {
                    //     // --- We have reached the end of the path
                    //     creep.clearActiveOrder();
                    // } else {
                    //     creep.memory.activeOrder.args[0] = Room.subPath(path, 1);
                    // }
                }
            }

            export function moveBySerializedPath(creep: Creep, err: number) {
                // Config.error(`!!! Error: ${Config.Errors[err]} in move by Serial path. On creep: ${creep.name}`);

                if(err === Config.ErrorCodes.END_OF_PATH) {
                    creep.clearActiveOrder();
                } else if(err !== OK) {
                    Config.error(`!!! Error: ${Config.Errors[err]} in move by Serial path. On creep: ${creep.name}`);
                }
            }
        }
    }
}