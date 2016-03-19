import {SimpleKey} from "../SimpleKey";

export class MaterialModel {
    id : number;
    codigo : string;
    tipo : SimpleKey;
    nombre : string;
    private _fecha : Date;

    constructor(id : number = null, codigo : string, nombre : string, tipo: SimpleKey, fechaIngreso : Date = new Date()) {
        this.id = id;
        this.codigo = codigo;
        this.tipo = tipo;
        this.nombre = nombre;
        this._fecha = fechaIngreso;
    }

    get fecha():Date {
        return this._fecha;
    }

    set fecha(value:Date) {
        this._fecha = value;
    }
}