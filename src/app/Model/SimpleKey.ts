export class SimpleKey {
    private _id : number;
    private _nombre : string;
    private _grupo : string;

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

    get grupo():string {
        return this._grupo;
    }

    set grupo(value:string) {
        this._grupo = value;
    }

    toJSON() {
        return {
            id : this.id,
            label : this.nombre,
            groupo : this.grupo
        }
    }
}