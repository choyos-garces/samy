import {Injectable} from "angular2/core";
import {BodegaModel} from "../../Model/Administracion/BodegaModel";

@Injectable()
export class BodegasService {
    private bodegas : Array<BodegaModel>;

    constructor() {
        this.bodegas = [];
        this.bodegas.push(
            new BodegaModel("Q-001", "Valencia", 1, new Date()),
            new BodegaModel("G-001", "Oficina", 2, new Date()),
            new BodegaModel("G-002", "Chrisitan", 3, new Date())
        );
    }

    push(bodega : BodegaModel) : BodegaModel {
        bodega.id = this.bodegas[this.bodegas.length-1].id + 1;
        this.bodegas.push(bodega);

        return bodega;
    }

    getBodegas() : Array<BodegaModel> {
        return this.bodegas;
    }

    getById(id : number) {
        var bodegas = this.getBodegas();

        bodegas.filter((bodega : BodegaModel) => {
            return bodega.id == id;
        });

        return bodegas;
    }
}