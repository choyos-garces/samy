import {Injectable} from "angular2/core";
import {InventarioMaterialModel} from "../../Model/Inventario/InventarioMaterialModel";
import {MaterialModel} from "../../Model/Administracion/MaterialModel";
import {BodegaModel} from "../../Model/Administracion/BodegaModel";

@Injectable()
export class InventarioMaterialesService {
    private _inventarioMateriales : InventarioMaterialModel[] = [];

    constructor() {}

    get inventarioMateriales():InventarioMaterialModel[] {
        return this._inventarioMateriales;
    }

    set inventarioMateriales(value:InventarioMaterialModel[]) {
        this._inventarioMateriales = value;
    }

    anadir(material : MaterialModel, cantidad : number, bodega : BodegaModel) : boolean {
        let inventarioExistente = this.buscar(material, bodega);
        const total = (inventarioExistente != null) ?  inventarioExistente.total + cantidad : cantidad;
        const id = (inventarioExistente != null) ?  inventarioExistente.id + 1 : 1;

        if(inventarioExistente != null) {
            const i = this._inventarioMateriales.indexOf(inventarioExistente);
            this._inventarioMateriales = [
                ...this._inventarioMateriales.slice(0, i),
                new InventarioMaterialModel(id, material, bodega, total),
                ...this._inventarioMateriales.slice(i+1),
            ]
        }

        return true;
    }

    remover(material : MaterialModel, cantidad : number, bodega : BodegaModel) : boolean {
        let inventarioExistente = this.buscar(material, bodega);

        if(inventarioExistente == null || inventarioExistente.total < cantidad) {

        }
        else {

        }

        //console.log("Remover " +cantidad + " del material: " + material.nombre + " en la bodega: " + bodega.nombre);
        return false
    }

    buscar(material : MaterialModel, bodega : BodegaModel) : InventarioMaterialModel {
        const result = this._inventarioMateriales.filter((inventario) => {
            return (inventario.material.id == material.id && inventario.bodega.id == bodega.id);
        });
        
        return result.length == 1  ? result[0] : null;
    }
}