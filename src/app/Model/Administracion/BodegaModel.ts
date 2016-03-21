export class BodegaModel {
    private _id : number;
    private _codigo : string;
    private _nombre : string;
    private _fecha : Date;

    constructor(id : number = null, codigo : string, nombre : string, fecha : Date = new Date()) {
        this._id = id;
        this._codigo = codigo;
        this._nombre = nombre;
        this._fecha = fecha;
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

    get nombre():string {
        return this._nombre;
    }

    get fecha():Date {
        return this._fecha;
    }
    
    toJSON () {
        return {
            id : this.id,
            codigo : this.codigo,
            nombre : this.nombre,
            fecha : this.fecha
        }
    }
}