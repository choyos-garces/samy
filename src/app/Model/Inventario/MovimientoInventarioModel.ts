import {BodegaModel} from "../Administracion/BodegaModel";
import {MovimientoMaterialModel} from "./MovimientoMaterialModel";

export class MovimientoInventarioModel {
    id : number;
    bodega : BodegaModel;
    tipoMovimiento : boolean;
    motivoMovimiento : number;
    private _fecha : Date;
    private _movimientoMateriales : Array<MovimientoMaterialModel>;

    constructor(id : number = null, bodega : BodegaModel, tipoMoviemiento : boolean, motivoMovimiento : number, fecha : Date = new Date) {
        this.id = id;
        this.bodega = bodega;
        this.tipoMovimiento = tipoMoviemiento;
        this.motivoMovimiento = motivoMovimiento;
        this._fecha = fecha;
        this._movimientoMateriales = [];
    }

    get movimientoMateriales() : Array<MovimientoMaterialModel> {
        return this._movimientoMateriales;
    }

    set movimientoMateriales( value:Array<MovimientoMaterialModel> ) {
        this._movimientoMateriales = value;
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