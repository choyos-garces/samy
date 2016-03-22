import {MaterialModel} from "../Administracion/MaterialModel";
import {BodegaModel} from "../Administracion/BodegaModel";

export class InventarioMaterialModel {
    private _id : number;
    private _material : MaterialModel;
    private _bodega : BodegaModel;
    private _total : number;
    private _fecha : Date;

    constructor(id : number, material : MaterialModel, bodega : BodegaModel, existente : number, fecha : Date = new Date) {
        this._id = id;
        this._material = material;
        this._bodega = bodega;
        this._total = existente;
        this._fecha = fecha;
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

    get bodega():BodegaModel {
        return this._bodega;
    }

    set bodega(value:BodegaModel) {
        this._bodega = value;
    }

    get total():number {
        return this._total;
    }

    set total(value:number) {
        this._total = value;
    }

    get fecha():Date {
        return this._fecha;
    }

    set fecha(value:Date) {
        this._fecha = value;
    }
}