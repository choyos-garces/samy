export class ContactoModel {
    private _id : number;
    private _nombre : string;
    private _telefono : string;
    private _correo : string;
    private _fecha : Date;
    private _estado : boolean;

    constructor(id : number = null, nombre : string, telefono : string, correo : string, fechaIngreso : Date = new Date() ) {
        this._id = id;
        this._nombre = nombre;
        this._telefono = telefono;
        this._correo = correo;
        this._fecha = fechaIngreso;
    }
    
    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get nombre():string {
        return this._nombre;
    }

    set nombre(value:string) {
        this._nombre = value;
    }

    get numeroTelefono():string {
        return this._telefono;
    }

    set numeroTelefono(value:string) {
        this._telefono = value;
    }

    get correo():string {
        return this._correo;
    }

    set correo(value:string) {
        this._correo = value;
    }

    get fecha():Date {
        return this._fecha;
    }

    set fecha(value:Date) {
        this._fecha = value;
    }

    get estado():boolean {
        return this._estado;
    }

    set estado(value:boolean) {
        this._estado = value;
    }

    toJSON() {
        return {
            id : this.id,
            nombre : this.nombre,
            numeroTelefono : this.numeroTelefono,
            correo : this.correo,
            fechaIngreso : this.fecha,
            estado : this.estado
        }
    }
}