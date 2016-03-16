export class ContactoModel {
    id : number;
    nombre : string;
    numeroTelefono : string;
    correo : string;
    fechaIngreso : Date;
    estado : boolean;

    constructor(id : number = null, nombre : string, numeroTelefono : string, correo : string, fechaIngreso : Date = new Date() ) {
        this.id = id;
        this.nombre = nombre;
        this.numeroTelefono = numeroTelefono;
        this.correo = correo;
        this.fechaIngreso = fechaIngreso;
    }
}