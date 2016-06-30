
namespace Interfaces {

    // ======================================================= //
    /* ********************* Components ********************** */
    // ======================================================= //

    export interface IController {
        loop(): void;
    }

    export interface IService {
        globalBootstrap(): void;
        update(): void;
    }

    export interface IAction {
        body: string[];
        role: string;

        run(item: any): void;

        resultHandlers: {
            [action: string]: (creep: Creep, err: number) => void;
        }
    }


    // ======================================================= //
    /* *********************** Memory ************************ */
    // ======================================================= //

    // --- Creep Memory
    export interface ICreepMemory {
        role: string;
        activeOrder: IOrder;
        orderQueue: IOrder[];
    }

    export interface IOrder {
        action: string;
        targetId?: string;
        args?: any[];
        moveTo?: boolean;
    }

    // --- Source Memory
    export interface ISourceMemory {
        numHaulers: number;
        harvestPositions: IStoredRoomPosition[];
    }

    export interface IStoredRoomPosition {
        x: number;
        y: number;
        roomName: string;
    }

    // --- Spawn Memory
    export interface ISpawnMemory {
        sourcePaths: {
            [xy: string]: string;
        }
    }


    // --- Flag Memory
    export interface IFlagMemory {
        
    }

    // --- Room Memory
    export interface IRoomMemory {
        harvestAssignments: {
            [xy: string]: string  // Map of x,y => creepId
        }
    }
    
}