import {Injectable} from "angular2/core";
import {BodegaModel} from "../../Model/Administracion/BodegaModel";

@Injectable()
export class BodegasService {
    private _bodegas : Array<BodegaModel> = [];

    constructor() {
        this.push(new BodegaModel(null, "Q-001", "Valencia"));
        this.push(new BodegaModel(null, "G-001", "Oficina"));
        this.push(new BodegaModel(null, "G-002", "Chrisitan"));
    }

    push(bodega : BodegaModel) : BodegaModel {
        const id = this.bodegas.length != 0 ? this.bodegas[this.bodegas.length-1].id : 0;
        bodega.id = id + 1;
        this.bodegas = [...this.bodegas, bodega];

        return bodega;
    }

    get bodegas():Array<BodegaModel> {
        return this._bodegas;
    }

    set bodegas(value:Array<BodegaModel>) {
        this._bodegas = value;
    }

}