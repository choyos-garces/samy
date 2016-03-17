import {MaterialModel} from "../Administracion/MaterialModel";
import {BodegaModel} from "../Administracion/BodegaModel";

export class MovimientoInventarioModel {
    id : number;
    bodega : BodegaModel;
    tipoMovimiento : boolean;
    material : MaterialModel;
    cantidad : number;
    motivoMovimiento : number;
    fecha : Date;

    constructor(id : number = null, bodega : BodegaModel, tipoMoviemiento : boolean, material : MaterialModel, cantidad : number, motivoMovimiento : number, fecha : Date = new Date) {
        this.id = id;
        this.bodega = bodega;
        this.tipoMovimiento = tipoMoviemiento;
        this.material = material;
        this.cantidad = cantidad;
        this.motivoMovimiento = motivoMovimiento;
        this.fecha = fecha;
    }

    getFecha() : string {
        var hours = this.fecha.getHours();
        var minutes = this.fecha.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var min = minutes < 10 ? '0'+minutes : minutes;

        var time = hours + ":" + min + ampm;
        var date = this.fecha.getDate() + "/" + this.fecha.getMonth() + "/" + this.fecha.getFullYear();

        return date + " " + time;
    }
}