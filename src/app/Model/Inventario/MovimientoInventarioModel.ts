import {MovimientoMaterialModel} from "./MovimientoMaterialModel";
import {SimpleKey} from "../SimpleKey";

import {BodegaModel} from "../Administracion/BodegaModel";
import {ProveedorModel} from "../Administracion/ProveedorModel";
import {PlantacionModel} from "../Administracion/PlantacionModel";

export class MovimientoInventarioModel {
    private _id : number;
    private _bodega : BodegaModel;
    private _tipoMovimiento : number;
    private _motivoMovimiento : SimpleKey;
    private _fecha : Date;
    private _movimientosMateriales : Array<MovimientoMaterialModel>;
    private _detalles : { proveedor?:ProveedorModel, bodega?:BodegaModel, plantacion?:PlantacionModel, factura?:string, notas?:string};

    constructor(id : number = null, bodega : BodegaModel, tipoMoviemiento : number, motivoMovimiento : SimpleKey, fecha : Date = new Date) {
        this._id = id;
        this._bodega = bodega;
        this._tipoMovimiento = tipoMoviemiento;
        this._motivoMovimiento = motivoMovimiento;
        this._fecha = fecha;
        this._movimientosMateriales = [];
    }

    get id():number {
        return this._id;
    }

    get bodega():BodegaModel {
        return this._bodega;
    }

    get tipoMovimiento():number {
        return this._tipoMovimiento;
    }

    get motivoMovimiento():SimpleKey {
        return this._motivoMovimiento;
    }

    get movimientosMateriales() : Array<MovimientoMaterialModel> {
        return this._movimientosMateriales;
    }

    set movimientosMateriales(value:Array<MovimientoMaterialModel> ) {
        this._movimientosMateriales = value;
    }

    get fecha(): Date {
        return this._fecha;
    }


    get detalles():{proveedor?:ProveedorModel; bodega?:BodegaModel; plantacion?:PlantacionModel; factura?:string; notas?:string} {
        return this._detalles;
    }

    set detalles(value:{proveedor?:ProveedorModel; bodega?:BodegaModel; plantacion?:PlantacionModel; factura?:string; notas?:string}) {
        this._detalles = value;
    }

    toJSON() {
        return {
            id : this.id,
            bodega : this.bodega,
            tipoMovimiento : this.tipoMovimiento,
            motivoMovimiento : this.motivoMovimiento,
            fecha : this.fecha,
            movimientosMateriales : this.movimientosMateriales,
            opciones : this.detalles
        }
    }
}