import {MovimientoInventarioModel} from "./MovimientoInventarioModel";

export class InventarioMovimientoMotivoModel {
    private _id : number;
    private _numeroMateriales : number;
    private _movimiento : MovimientoInventarioModel;
    private _notas : string;
    
    constructor(id : number, movimiento : MovimientoInventarioModel, notas : string) {
        this._id = id;
        this._movimiento = movimiento;
        this._notas = notas;
        this._numeroMateriales = this.movimiento.movimientosMateriales.length;
    }
    
    get id():number {
        return this._id;
    }

    get numeroMateriales():number {
        return this._numeroMateriales;
    }

    get movimiento():MovimientoInventarioModel {
        return this._movimiento;
    }

    get notas():string {
        return this._notas;
    }
}