/// <reference path="../_references" />

// ///////////////////////////////////////////////////////////////
// --- Library Modifications
// ///////////////////////////////////////////////////////////////

namespace Config {

    export namespace LibraryModifications {

        export function globalBootstrap(): void {
            extendCreep();
            extendSource();
            extendRoomPosition();
        }

        function extendCreep() {
            _.extend(Creep.prototype, {
                attemptOrder: function(order: Interfaces.IOrder): number {
                    if(!_.isFunction(this[order.action])) {
                        // Config.error(`Error! Action: ${order.action} does not exist.`);
                        return -99;
                    } else if(order.targetId) {
                        var target = Game.getObjectById<any>(order.targetId);

                        var result = this[order.action].apply(this, [target].concat(order.args));

                        if(order.moveTo && result === ERR_NOT_IN_RANGE) {
                            // console.log('move to', target.id);
                            // Config.logObj(this.pos);
                            // Config.logObj(target.pos);

                            return this.moveTo(target);
                        }

                        return result;
                    }

                    return this[order.action].apply(this, order.args);
                },

                run: function() {
                    var Action = Managers.GameManager.creepActions[this.memory.role];
                    Action.run(this);

                    // if(!this.memory.activeOrder && this.memory.orderQueue.length > 0) {
                    //     this.memory.activeOrder = this.memory.orderQueue.shift();
                    // }
                    //
                    // if(this.memory.activeOrder) {
                    //     var result = this.attemptOrder(this.memory.activeOrder);
                    //
                    //     if(result !== OK) {
                    //         Config.error(`!!! Error: ${Config.Errors[result]} on creep: ${this.name}`);
                    //
                    //         // --- Run Handler if it exists
                    //         if(Action.errorHandlers[this.memory.activeOrder.action]) {
                    //             Action.errorHandlers[this.memory.activeOrder.action](this, result, this.memory.activeOrder);
                    //         }
                    //     }
                    // }
                },

                execNextOrder: function(): number {
                    if(!this.memory.activeOrder && this.memory.orderQueue.length > 0) {
                        this.memory.activeOrder = this.memory.orderQueue.shift();
                    }

                    if(this.memory.activeOrder) {
                        return this.attemptOrder(this.memory.activeOrder);
                    }

                    return 0;
                },

                addOrder: function(order: Interfaces.IOrder, front?: boolean) {
                    if(front) {
                        this.memory.orderQueue.unshift(order);
                    } else {
                        this.memory.orderQueue.push(order);
                    }
                },

                setActiveOrder: function(order: Interfaces.IOrder) {
                    this.memory.activeOrder = order;
                },

                clearActiveOrder: function() {
                    delete this.memory.activeOrder;
                },

                clearAllOrders: function() {
                    this.clearActiveOrder();
                    this.memory.orderQueue = [];
                }
            });
        }


        function extendSource() {
            // _.extend(Source.prototype, {
            //     getAvailableMiningPositions: function(): RoomPosition[] {
            //         var pos = this.pos;
            //         var room = this.room;
            //
            //         var miningPositions = [];
            //
            //
            //
            //         return [];
            //     }
            // });
        }


        function extendRoomPosition() {
            _.extend(RoomPosition.prototype, {
                clone: function(): RoomPosition {
                    return Game.rooms[this.roomName].getPositionAt(this.x, this.y);
                },

                getSurroundingWalkablePositions: function(): RoomPosition[] {
                    return _.filter<RoomPosition>(this.getSurroundingPositions(), p => p.isWalkable());
                },
                getSurroundingPositions: function(): RoomPosition[] {
                    var room = Game.rooms[this.roomName];
                    var x = this.x;
                    var y = this.y;

                    return [
                        room.getPositionAt(x-1, y-1),
                        room.getPositionAt(x, y-1),
                        room.getPositionAt(x+1, y-1),
                        room.getPositionAt(x-1, y),
                        room.getPositionAt(x+1, y),
                        room.getPositionAt(x-1, y+1),
                        room.getPositionAt(x, y+1),
                        room.getPositionAt(x+1, y+1)
                    ];
                },
                isWalkable: function(): boolean {
                    return _.reduce(this.look(), isWalkableIterator, true);
                }
            });

            function isWalkableIterator(isWalkable: boolean, result: LookAtResult) {
                return isWalkable && isWalkableResult(result);
            }

            function isWalkableResult(result: LookAtResult): boolean {
                switch(true) {
                    case result.type === 'mineral':
                    case result.type === 'source':
                    case result.type === 'terrain' && Config.Obstacles[result.terrain]:
                    case result.type === 'constructionSite' && Config.Obstacles[result.constructionSite.structureType]:
                    case result.type === 'structure' && Config.Obstacles[result.structure.structureType]:
                        return false;
                    default:
                        return true;
                }
            }
        }
    }
}







































