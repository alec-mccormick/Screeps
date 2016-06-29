/// <reference path="../../_references" />

// ///////////////////////////////////////////////////////////////
// --- Structure Service
// ///////////////////////////////////////////////////////////////

namespace Services {
    export namespace StructureService {

        export var structures: _.Dictionary<Structure>;

        export function globalBootstrap(): void {
            structures = Game.structures;
        }

        export function update(): void {

        }
    }
}