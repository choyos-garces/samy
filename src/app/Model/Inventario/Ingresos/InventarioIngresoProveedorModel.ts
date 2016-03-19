import {MovimientoInventarioModel} from "../MovimientoInventarioModel";
import {InventarioMovimientoMotivoModel} from "../InventarioMovimientoMotivoModel";
import {ProveedorModel} from "../../Administracion/ProveedorModel";

export class InventarioIngresoProveedorModel  extends InventarioMovimientoMotivoModel{

    private _poveedor : ProveedorModel;
    private _factura : string;
    constructor(id : number, movimiento : MovimientoInventarioModel, proveedor : ProveedorModel, factura : string, notas : string = null) {
        super(id, movimiento, notas);
        this._poveedor = proveedor;
        this._factura = factura;
    }

    get poveedor():ProveedorModel {
        return this._poveedor;
    }

    get factura():string {
        return this._factura;
    }
}