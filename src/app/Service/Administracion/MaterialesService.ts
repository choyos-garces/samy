import {Injectable} from "angular2/core";
import {MaterialModel} from "../../Model/Administracion/MaterialModel";
import {SimpleKey} from "../../Model/SimpleKey";

@Injectable()
export class MaterialesService {
    private _materiales : Array<MaterialModel> = [];
    private _tiposMaterial : Array<SimpleKey>;

    constructor() {}

    get materiales():Array<MaterialModel> {
        return this._materiales;
    }

    set materiales(value:Array<MaterialModel>) {
        this._materiales = value;
    }

    get tiposMaterial():Array<SimpleKey> {
        return this._tiposMaterial;
    }

    set tiposMaterial(value:Array<SimpleKey>) {
        this._tiposMaterial = value;
    }

    getById(id : number) : MaterialModel{
        const result = this.materiales.filter((material : MaterialModel) => material.id == id);
        return result.length == 1 ? result[0] : null;
    }

    push(material : MaterialModel) : MaterialModel {
        material.id = this._materiales[this._materiales.length-1].id + 1;
        this._materiales = [...this._materiales, material ];

        return material;
    }

    pop(material) {
        const index = this._materiales.indexOf(material);

        this._materiales = [
            ...this.materiales.slice(0, index),
            ...this.materiales.slice(index+1)
        ]
    }
}