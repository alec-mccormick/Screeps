/// <reference path="../_references" />

// ///////////////////////////////////////////////////////////////
// --- Library Modifications
// ///////////////////////////////////////////////////////////////

namespace Config {

    export namespace LibraryModifications {

        function getDx(dir: number) {
            return (dir >= 2 && dir <= 4) ? 1 : (dir >= 6) ? -1 : 0;
        }

        function getDy(dir: number) {
            return (dir >= 4 && dir <= 6) ? 1 : (dir <= 2 || dir === 8) ? -1 : 0;
        }


        export function globalBootstrap(): void {
            extendCreep();
            extendSource();
            extendRoomPosition();
        }

        function extendCreep() {
            _.extend(Creep.prototype, {
                attemptOrder: function(order: Interfaces.IOrder): number {
                    if(!_.isFunction(this[order.action])) {
                        return -99;
                    } else if(order.targetId) {
                        var target = Game.getObjectById<any>(order.targetId);

                        var result = this[order.action].apply(this, [target].concat(order.args));

                        // --- If moveTo is true & we're out of range of the target, move towards it.
                        return (order.moveTo && result === ERR_NOT_IN_RANGE) ? this.moveTo(target) : result;
                    }

                    return this[order.action].apply(this, order.args);
                },

                run: function() {
                    var Action = Managers.GameManager.creepActions[this.memory.role];
                    Action.run(this);

                    var result = this.execNextOrder();

                    var activeOrder = this.memory.activeOrder;
                    if(activeOrder && Action.resultHandlers[activeOrder.action]) {
                        Action.resultHandlers[activeOrder.action](this, result);
                    }
                },

                execNextOrder: function(): number {
                    if(!this.memory.activeOrder && this.memory.orderQueue.length > 0) {
                        console.log('executing next order');

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
                },

                moveBySerializedPath: function(path: string): number {
                    if(path.length < 5) return ERR_INVALID_ARGS;

                    var x = parseInt(path.slice(0, 2));
                    var y = parseInt(path.slice(2, 4));
                    var directions = path.slice(4);

                    // 26 22 233323323
                    var dir = parseInt(directions[0]);

                    if(_.isNaN(dir)) return ERR_INVALID_ARGS;

                    x -= getDx(dir);
                    y -= getDy(dir);

                    for(var i = 0, len = directions.length; i < len; i++) {
                        dir = parseInt(directions[i]);

                        if(_.isNaN(dir)) return ERR_INVALID_ARGS;

                        if(this.pos.isEqualTo(x, y)) {
                            console.log(`(${x}, ${y}) MOVING DIR: ${dir}`);

                            var result = this.move(dir);
                            if(result === OK && this.pos.isEqualTo(x, y)) {
                                this.pos = this.pos.getPositionInDirection(dir);
                            }

                            return result;
                        } else {
                            x += getDx(dir);
                            y += getDy(dir);
                        }
                    }
                    
                    if(this.pos.isEqualTo(x, y)) {
                        return Config.ErrorCodes.END_OF_PATH;
                    }

                    return ERR_NOT_FOUND;
                }
            });
        }


        function extendSource() {
            Object.defineProperty(Source.prototype, 'memory', {
                get: function() {
                    return Memory.sources[this.id];
                },
                set: function(mem) {
                    Memory.sources[this.id] = mem;
                },
                enumerable: true
            });
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
                },
                getPositionInDirection(dir: number) {
                    return Game.rooms[this.roomName].getPositionAt(this.x + getDx(dir), this.y + getDy(dir));
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


            _.extend(RoomPosition.prototype, {
                toKey: function() {
                    return this.x + ',' + this.y;
                }
            });
        }


    }
}






































