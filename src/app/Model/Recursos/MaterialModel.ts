export class MaterialModel {
    id : number;
    codigo : string;
    tipo : number;
    nombre : string;
    fechaIngreso : Date;

    constructor(codigo : string, nombre : string, tipo: number, id : number = null, fechaIngreso : Date = new Date()) {
        this.id = id;
        this.codigo = codigo;
        this.tipo = tipo;
        this.nombre = nombre;
        this.fechaIngreso = fechaIngreso;
    }

    getFechaIngreso() : string {
        var date = this.fechaIngreso;
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
}