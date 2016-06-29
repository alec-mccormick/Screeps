
namespace Interfaces {

    export interface ICreepsRoleMap {
        [role: string]: Creep[]
    }

    export interface ICreepsRoomMap {
        [roomName: string]: ICreepsRoleMap
    }

    export interface IController {
        new(value?: any): IController;

        loop(): void;
    }

    export interface IService {
        globalBootstrap(): void;
        update(): void;
    }

    export interface IAction {
        
    }
}