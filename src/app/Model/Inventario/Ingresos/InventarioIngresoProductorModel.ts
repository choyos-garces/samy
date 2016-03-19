import {InventarioMovimientoMotivoModel} from "../InventarioMovimientoMotivoModel";
import {ProductorModel} from "../../Administracion/ProductorModel";
import {PlantacionModel} from "../../Administracion/PlantacionModel";
import {MovimientoInventarioModel} from "../MovimientoInventarioModel";

export class InventarioIngresoProductorModel extends InventarioMovimientoMotivoModel {
    private _productor : ProductorModel;
    private _plantacion : PlantacionModel;

    constructor(id : number, movimiento : MovimientoInventarioModel, productor : ProductorModel, plantacion : PlantacionModel, notas : string = null) {
        super(id, movimiento, notas);
        this._productor = productor;
        this._plantacion = plantacion;
    }

    get productor():ProductorModel {
        return this._productor;
    }

    get plantacion():PlantacionModel {
        return this._plantacion;
    }
}