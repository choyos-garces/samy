import {Injectable} from "angular2/core";
import {MovimientoInventarioModel} from "../../Model/Inventario/MovimientoInventarioModel";
import {MotivoMovimientoModel} from "../../Model/Inventario/MotivoMovimientoModel";
import {InventarioMaterialesService} from "./InventarioMaterialesService";

@Injectable()
export class MovimientosInventarioService {
    private _movimientosInventario : Array<MovimientoInventarioModel> = [];
    private _motivosMovimiento : Array<MotivoMovimientoModel> = [];
    
    constructor(public _inventarioMaterialesService : InventarioMaterialesService) {}

    push(movimiento : MovimientoInventarioModel) : MovimientoInventarioModel {
        const id = this._movimientosInventario.length != 0 ? this._movimientosInventario[this._movimientosInventario.length-1].id : 0;
        movimiento.id = id + 1;
        for(let movimientoMaterial of  movimiento.movimientosMateriales) {
            if(movimiento.motivoMovimiento.id == 1)
                this._inventarioMaterialesService.anadir(movimientoMaterial.material, movimientoMaterial.cantidad, movimiento.bodega);
            else
                this._inventarioMaterialesService.remover(movimientoMaterial.material, movimientoMaterial.cantidad, movimiento.bodega);
        }

        this._movimientosInventario = [ ...this._movimientosInventario, movimiento ];

        console.log(this._inventarioMaterialesService.inventarioMateriales);

        return movimiento;
    }

    get movimientosInventario():Array<MovimientoInventarioModel> {
        return this._movimientosInventario;
    }

    get motivosMovimiento():Array<MotivoMovimientoModel> {
        return this._motivosMovimiento;
    }

    set motivosMovimiento(value:Array<MotivoMovimientoModel>) {
        this._motivosMovimiento = value;
    }
}