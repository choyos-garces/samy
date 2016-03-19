import {BodegaModel} from "../Administracion/BodegaModel";
import {MovimientoMaterialModel} from "./MovimientoMaterialModel";
import {SimpleKey} from "../SimpleKey";

export class MovimientoInventarioModel {
    id : number;
    bodega : BodegaModel;
    tipoMovimiento : boolean;
    motivoMovimiento : SimpleKey;
    private _fecha : Date;
    private _movimientosMateriales : Array<MovimientoMaterialModel>;

    constructor(id : number = null, bodega : BodegaModel, tipoMoviemiento : boolean, motivoMovimiento : SimpleKey, fecha : Date = new Date) {
        this.id = id;
        this.bodega = bodega;
        this.tipoMovimiento = tipoMoviemiento;
        this.motivoMovimiento = motivoMovimiento;
        this._fecha = fecha;
        this._movimientosMateriales = [];
    }

    get movimientosMateriales() : Array<MovimientoMaterialModel> {
        return this._movimientosMateriales;
    }

    set movimientosMateriales(value:Array<MovimientoMaterialModel> ) {
        this._movimientosMateriales = value;
    }

    get fecha(): string {
        var hours = this._fecha.getHours();
        var minutes = this._fecha.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var min = minutes < 10 ? '0'+minutes : minutes;

        var time = hours + ":" + min + ampm;
        var date = this._fecha.getDate() + "/" + this._fecha.getMonth() + "/" + this._fecha.getFullYear();

        return date + " " + time;
    }
}