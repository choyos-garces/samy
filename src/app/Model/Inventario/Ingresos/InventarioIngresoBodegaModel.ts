import {MovimientoInventarioModel} from "../MovimientoInventarioModel";
import {InventarioMovimientoMotivoModel} from "../InventarioMovimientoMotivoModel";
import {BodegaModel} from "../../Administracion/BodegaModel";

export class InventarioIngresoBodegaModel extends InventarioMovimientoMotivoModel {

    private _bodega : BodegaModel;

    constructor(id : number, movimiento : MovimientoInventarioModel, bodega : BodegaModel, notas : string = null) {
        super(id, movimiento, notas);
        this._bodega = bodega;
    }

    get bodega():BodegaModel {
        return this._bodega;
    }
    
}