import {Injectable} from "angular2/core";
import {PlantacionModel} from "../../Model/Administracion/PlantacionModel";
import {ProductorModel} from "../../Model/Administracion/ProductorModel";
import {SimpleKey} from "../../Model/SimpleKey";

@Injectable()
export class PlantacionesService {
    private _plantaciones : Array<PlantacionModel> = [];
    private _productos : Array<SimpleKey> = [];
    private _tipos : Array<SimpleKey> = [];
    private _unidades : Array<SimpleKey> = [];

    constructor() {
        this._productos = [
            new SimpleKey(1, "Banano"),
            new SimpleKey(2, "Verde")
            ];

        this._tipos = [
            new SimpleKey(1, "Organico"),
            new SimpleKey(2, "Convencional")
        ];

        this._unidades = [
            new SimpleKey(1, "ha."),
            new SimpleKey(2, "m2.")
        ];
    }

    get plantaciones():Array<PlantacionModel> {
        return this._plantaciones;
    }

    set plantaciones(value:Array<PlantacionModel>) {
        this._plantaciones = value;
    }

    get productos():Array<SimpleKey> {
        return this._productos;
    }

    set productos(value:Array<SimpleKey>) {
        this._productos = value;
    }

    get tipos():Array<SimpleKey> {
        return this._tipos;
    }

    set tipos(value:Array<SimpleKey>) {
        this._tipos = value;
    }

    get unidades():Array<SimpleKey> {
        return this._unidades;
    }

    set unidades(value:Array<SimpleKey>) {
        this._unidades = value;
    }

    push( plantacion : PlantacionModel) : PlantacionModel {
        const id = this._plantaciones.length != 0 ? this._plantaciones[this._plantaciones.length-1].id : 0;
        plantacion.id = id + 1;
        this._plantaciones = [...this._plantaciones, plantacion];

        return plantacion;
    }

    getById(id : number) : PlantacionModel {
        const results = this.plantaciones.filter((plantacion : PlantacionModel ) => plantacion.id == id);
        return (results.length == 1) ? results[0] : null;
    }

    getByPropietario(propietario : ProductorModel) : PlantacionModel[] {
        return this.plantaciones.filter((plantacion : PlantacionModel ) => plantacion.propietario.id == propietario.id);
    }
}
