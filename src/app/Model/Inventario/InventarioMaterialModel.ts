import {MaterialModel} from "../Administracion/MaterialModel";
import {BodegaModel} from "../Administracion/BodegaModel";

export class InventarioMaterialModel {
    id : number;
    material : MaterialModel;
    bodega : BodegaModel;
    existente : number;
    fecha : Date; // fecha del ultimo movimiento
}