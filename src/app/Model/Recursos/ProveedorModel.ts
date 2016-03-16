export class ProveedorModel {
    id : number;
    razonSocial : string;
    tipoIdentificacion : number;
    identificacion : string;
    direccion : string;
    correo : string;
    fechaIngreso : Date;

    constructor(id : number = null, razonSocial : string, tipoIdentificacion : number, identificacion : string, direccion : string, correo : string, fechaIngreso : Date = new Date) {
        this.id = id;
        this.razonSocial = razonSocial;
        this.tipoIdentificacion = tipoIdentificacion;
        this.identificacion = identificacion;
        this.direccion = direccion;
        this.correo = correo;
        this.fechaIngreso = fechaIngreso;
    }
}