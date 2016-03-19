import {Injectable} from "angular2/core";
import {MovimientoInventarioModel} from "../../Model/Inventario/MovimientoInventarioModel";
import {MotivoMovimientoModel} from "../../Model/Inventario/MotivoMovimientoModel";

@Injectable()
export class MovimientosInventarioService {
    private _movimientosInventario : Array<MovimientoInventarioModel> = [];
    private _motivosMovimiento : Array<MotivoMovimientoModel> = [];
    
    constructor() {
        this.motivosMovimiento = [
            new MotivoMovimientoModel(1, "Ingreso por Proveedor", 1),
            new MotivoMovimientoModel(2, "Transferencia desde otra Bodega", 1),
            new MotivoMovimientoModel(3, "Devolucion por Productor", 1),
            new MotivoMovimientoModel(4, "Envio a Productor", 0),
            new MotivoMovimientoModel(5, "Transferir materiales a otra Bodega", 0),
            new MotivoMovimientoModel(6, "Devolver materiales a Proveedor", 0)
        ]
    }

    push(movimiento : MovimientoInventarioModel) : MovimientoInventarioModel {
        movimiento.id = this._movimientosInventario[this._movimientosInventario.length-1].id + 1;
        this._movimientosInventario = [ ...this._movimientosInventario, movimiento ];

        return movimiento;
    }

    get movimientosInventario():Array<MovimientoInventarioModel> {
        return this._movimientosInventario;
    }

    set movimientosInventario(value:Array<MovimientoInventarioModel>) {
        this._movimientosInventario = value;
    }

    get motivosMovimiento():Array<MotivoMovimientoModel> {
        return this._motivosMovimiento;
    }

    set motivosMovimiento(value:Array<MotivoMovimientoModel>) {
        this._motivosMovimiento = value;
    }

    get motivosIngresso() : MotivoMovimientoModel[] {
        return this.motivosMovimiento.filter((motivo : MotivoMovimientoModel)=> motivo.tipo == 1 )
    }

    get motivosEgresos() : MotivoMovimientoModel[] {
        return this.motivosMovimiento.filter((motivo : MotivoMovimientoModel)=> motivo.tipo == 0 )
    }
}