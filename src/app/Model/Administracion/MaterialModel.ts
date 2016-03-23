import {SimpleKey} from "../SimpleKey";

export class MaterialModel {
    private _id : number;
    private _codigo : string;
    private _tipo_material : SimpleKey;
    private _nombre : string;
    private _fecha : Date|string;

    constructor(id : number = null, codigo : string, nombre : string, tipo: SimpleKey, fechaIngreso : Date = new Date()) {
        this._id = id;
        this._codigo = codigo;
        this._tipo_material = tipo;
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

    get tipo_material():SimpleKey {
        return this._tipo_material;
    }

    get nombre():string {
        return this._nombre;
    }

    get fecha():Date|string {
        return this._fecha;
    }
    
    toJSON(){
        return {
            id : this.id,
            codigo : this.codigo,
            tipoMaterial : this.tipo_material,
            nombre : this.nombre,
            fecha : this.fecha
        }
    }   
}