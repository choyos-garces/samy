import {SimpleKey} from "../SimpleKey";

export class MaterialModel {
    private _id : number;
    private _codigo : string;
    private _tipo : SimpleKey;
    private _nombre : string;
    private _fecha : Date;

    constructor(id : number = null, codigo : string, nombre : string, tipo: SimpleKey, fechaIngreso : Date = new Date()) {
        this._id = id;
        this._codigo = codigo;
        this._tipo = tipo;
        this._nombre = nombre;
        this._fecha = fechaIngreso;
    }
    
    get id():number {
        return this._id;
    }
    
    set id(value:number) {
        this._id = value;
    }

    get codigo():string {
        return this._codigo;
    }

    get tipo():SimpleKey {
        return this._tipo;
    }

    get nombre():string {
        return this._nombre;
    }

    get fecha():Date {
        return this._fecha;
    }
    
    toJSON(){
        return {
            id : this.id,
            codigo : this.codigo,
            tipo : this.tipo,
            nombre : this.nombre,
            fecha : this.fecha
        }
    }   
}