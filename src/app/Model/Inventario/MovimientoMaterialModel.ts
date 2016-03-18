import {MaterialModel} from "../Administracion/MaterialModel";
import {MovimientoInventarioModel} from "./MovimientoInventarioModel";
export class MovimientoMaterialModel {
    id : number;
    material : MaterialModel;
    cantidad : number;
    movimientoInventario : MovimientoInventarioModel;

    constructor(id : number = null, material : MaterialModel, cantidad : number, movimientoInventario : MovimientoInventarioModel = null) {
        this.id = id;
        this.material = material;
        this.cantidad = cantidad;
        this.movimientoInventario = movimientoInventario;
    }
}