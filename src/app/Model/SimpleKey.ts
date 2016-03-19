export class SimpleKey {
    private _id : number;
    private _label : string;

    constructor(id : number , label : string) {
        this._id = id;
        this._label = label;
    }

    get id():number {
        return this._id;
    }

    get label():string {
        return this._label;
    }
}