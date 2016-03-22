export class SimpleKey {
    private _id : number;
    private _nombre : string;

    constructor(id : number , label : string) {
        this._id = id;
        this._nombre = label;
    }

    get id():number {
        return this._id;
    }

    get nombre():string {
        return this._nombre;
    }

    toJSON() {
        return {
            id : this.id,
            label : this.nombre
        }
    }
}