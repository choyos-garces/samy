import {Injectable} from "angular2/core";
import {MaterialModel} from "../../Model/Administracion/MaterialModel";
import {SimpleKey} from "../../Model/SimpleKey";

@Injectable()
export class MaterialesService {
    private _tiposMaterial : Array<SimpleKey>;
    private _materiales : Array<MaterialModel>;

    constructor() {
        this._tiposMaterial = [
            new SimpleKey(1, "Fundas"),
            new SimpleKey(2, "Material Post Cosecha"),
            new SimpleKey(3, "Etiquetas y bandas para proceso"),
            new SimpleKey(4, "Datos de tipo carton"),
            new SimpleKey(5, "Materiales de Paletizado"),
            new SimpleKey(6, "Sticker de Corte")
        ];

        this._materiales = [];
        this._materiales.push(
            new MaterialModel(1, "CA-001", "Cosa A", this._tiposMaterial[0]),
            new MaterialModel(2, "CA-002", "Cosa B", this._tiposMaterial[0]),
            new MaterialModel(3, "CB-001", "Cosa C", this._tiposMaterial[0]),
            new MaterialModel(4, "CB-002", "Cosa D", this._tiposMaterial[0]),
            new MaterialModel(5, "CC-001", "Cosa E", this._tiposMaterial[0]),
            new MaterialModel(6, "CC-002", "Cosa F", this._tiposMaterial[0]),
            new MaterialModel(7, "CD-001", "Cosa G", this._tiposMaterial[0]),
            new MaterialModel(8, "CD-002", "Cosa H", this._tiposMaterial[0])
        );
    }

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

    getById(id : number) : MaterialModel {
        const results  = this._materiales.filter(function(material : MaterialModel) {
           return material.id == id;
        });

        return (results.length == 1) ? results[0] : null;
    }
}