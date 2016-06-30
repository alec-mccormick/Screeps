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

            var result = creep.execNextOrder();

            if(this.resultHandlers[creep.memory.activeOrder.action]) {
                this.resultHandlers[creep.memory.activeOrder.action](creep, result);
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
        }
    }
}