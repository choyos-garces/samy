export class BodegaModel {
    id : number;
    codigo : string;
    nombre : string;
    fechaIngreso : Date;

    constructor(codigo : string, nombre : string, id : number = null, fechaIngreso : Date = new Date()) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.fechaIngreso = fechaIngreso;
    }

    getFechaIngreso() : string {
        var date = this.fechaIngreso;
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
}