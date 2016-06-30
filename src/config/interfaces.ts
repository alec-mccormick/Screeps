
namespace Interfaces {

    export interface ICreepsRoleMap {
        [role: string]: Creep[]
    }

    export interface ICreepsRoomMap {
        [roomName: string]: ICreepsRoleMap
    }

    export interface IController {
        loop(): void;
    }

    export interface IService {
        globalBootstrap(): void;
        update(): void;
    }

    export interface IAction {
        run(item: any): void;
    }

    export interface ICreepAction extends IAction {
        body: string[];
        role: string;

        run(creep: Creep): void;

        // errorHandlers: _.Dictionary<(c: Creep, err: number, o: IOrder) => void>;
    }

    export interface IOrder {
        action: string;
        targetId?: string;
        args: any[];
        moveTo: boolean;
    }

    export interface IStoredRoomPosition {
        x: number;
        y: number;
        roomName: string;
    }

    export interface ISourceMemory {
        numHaulers: number;
        harvestPositions: IStoredRoomPosition[];
    }

    // --- Pass roomId and x,y pos to get id of the assigned harvester
    export interface IHarvestAssignments {
        [roomId: string]: {
            [xy: string]: string
        }
    }
}