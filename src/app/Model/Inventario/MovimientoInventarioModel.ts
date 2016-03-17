import {MaterialModel} from "../Administracion/MaterialModel";

export class MovimientoInventarioModel {
    id : number;
    tipoMovimiento : boolean;
    material : MaterialModel;
    cantidad : number;
    motivoMovimiento : number;
    fecha : Date;

    constructor(id : number = null, tipoMoviemiento : boolean, material : MaterialModel, cantidad : number, motivoMovimiento : number, fecha : Date = new Date) {
        this.id = id;
        this.tipoMovimiento = tipoMoviemiento;
        this.material = material;
        this.cantidad = cantidad;
        this.motivoMovimiento = motivoMovimiento;
        this.fecha = fecha;
    }
}