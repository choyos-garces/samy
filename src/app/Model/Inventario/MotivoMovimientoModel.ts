export class MotivoMovimientoModel {
    private _id : number;
    private _label : string;
    private _tipo : number;
    
    constructor(id : number = null, label : string, tipo : number) {
        this._id = id;
        this._label = label;
        this._tipo = tipo;
    }

    get id():number {
        return this._id;
    }
    
    get label():string {
        return this._label;
    }

    get tipo():number {
        return this._tipo;
    }
}