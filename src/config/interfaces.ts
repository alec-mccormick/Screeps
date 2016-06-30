
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
    }


    // ======================================================= //
    /* *********************** Memory ************************ */
    // ======================================================= //

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