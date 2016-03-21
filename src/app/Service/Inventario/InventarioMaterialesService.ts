import {Injectable} from "angular2/core";
import {InventarioMaterialModel} from "../../Model/Inventario/InventarioMaterialModel";
import {MaterialModel} from "../../Model/Administracion/MaterialModel";
import {BodegaModel} from "../../Model/Administracion/BodegaModel";

@Injectable()
export class InventarioMaterialesService {
    inventarioMateriales : InventarioMaterialModel[] = [];

    constructor() {}

    add(material : MaterialModel, cantidad : number, bodega : BodegaModel) : number {
        return 0;
    }

    remove(material : MaterialModel, cantidad : number, bodega : BodegaModel) : number {
        return 0;
    }

    private find(material : MaterialModel) : MaterialModel[] {
        return;
    }
}