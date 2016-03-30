import {MaterialModel} from "../../Administracion/Models/MaterialModel";

export class MovimientoMaterialModel {
    private _id : number;
    private _material : MaterialModel;
    private _cantidad : number;
    private _tipoMovimiento : number;

    constructor(id : number = null, material : MaterialModel, cantidad : number) {
        this._id = id;
        this._material = material;
        this._cantidad = cantidad;
    }

    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get material():MaterialModel {
        return this._material;
    }

    set material(value:MaterialModel) {
        this._material = value;
    }

    get cantidad():number {
        return this._cantidad;
    }

    set cantidad(value:number) {
        this._cantidad = value;
    }

    get tipoMovimiento():number {
        return this._tipoMovimiento;
    }

    set tipoMovimiento(value:number) {
        this._tipoMovimiento = value;
    }

    toJSON() {
        return {
            id : this.id,
            material : this.material,
            cantidad : this.cantidad,
            tipoMovimiento : this.tipoMovimiento
        }
    }
}