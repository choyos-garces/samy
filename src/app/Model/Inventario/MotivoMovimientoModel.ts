export class MotivoMovimientoModel {
    private _id : number;
    private _nombre : string;
    private _tipo : number;
    
    constructor(id : number = null, label : string, tipo : number) {
        this._id = id;
        this._nombre = label;
        this._tipo = tipo;
    }

    get id():number {
        return this._id;
    }
    
    get nombre():string {
        return this._nombre;
    }

    get tipo():number {
        return this._tipo;
    }
    
    toJSON() {
        return {
            id : this.id,
            label : this.nombre,
            tipo : this.tipo
        }
    }
}