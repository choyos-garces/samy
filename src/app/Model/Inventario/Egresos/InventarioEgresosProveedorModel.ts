import {MovimientoInventarioModel} from "../MovimientoInventarioModel";
import {InventarioMovimientoMotivoModel} from "../InventarioMovimientoMotivoModel";
import {ProveedorModel} from "../../Administracion/ProveedorModel";

export class InventarioEgresosProveedorModel extends InventarioMovimientoMotivoModel{
    private _proveedor : ProveedorModel;

    constructor(id : number, movimiento : MovimientoInventarioModel, proveedor : ProveedorModel, notas : string = null) {
        super(id, movimiento, notas);
        this._proveedor = proveedor;
    }

    get proveedor():ProveedorModel {
        return this._proveedor;
    }
}