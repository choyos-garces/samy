import {Injectable} from "angular2/core";
import {MovimientoInventarioModel} from "../../Model/Inventario/MovimientoInventarioModel";
import {MaterialesService} from "../Administracion/MaterialesService";
import {MaterialModel} from "../../Model/Administracion/MaterialModel";
import {BodegaModel} from "../../Model/Administracion/BodegaModel";
import {BodegasService} from "../Administracion/BodegasService";

@Injectable()
export class MovimientosInventarioService {
    tiposMovimiento : Array<string>;
    movimientosInventario : Array<MovimientoInventarioModel>;

    constructor(public _materialesServices : MaterialesService, public _bodegasService : BodegasService) {
        this.tiposMovimiento = ["Ingreso" , "Egresos"];
        const materiales : Array<MaterialModel> = this._materialesServices.getMateriales();
        const bodegas : Array<BodegaModel> = this._bodegasService.getBodegas();
        let i = 1;
        this.movimientosInventario = [];
        this.movimientosInventario.push(
            new MovimientoInventarioModel(i++, bodegas[Math.floor(Math.random()*bodegas.length)], true,  2),
            new MovimientoInventarioModel(i++, bodegas[Math.floor(Math.random()*bodegas.length)], true,  2),
            new MovimientoInventarioModel(i++, bodegas[Math.floor(Math.random()*bodegas.length)], true,  2),
            new MovimientoInventarioModel(i++, bodegas[Math.floor(Math.random()*bodegas.length)], true,  2),
            new MovimientoInventarioModel(i++, bodegas[Math.floor(Math.random()*bodegas.length)], true,  2),
            new MovimientoInventarioModel(i, bodegas[Math.floor(Math.random()*bodegas.length)], true,  2)
        );

    }

    push(movimiento : MovimientoInventarioModel) : MovimientoInventarioModel {
        movimiento.id = this.movimientosInventario[this.movimientosInventario.length-1].id + 1;
        this.movimientosInventario.push(movimiento);

        return movimiento;
    }

    getIngresos() : Array<MovimientoInventarioModel> {
        return this.movimientosInventario.filter((movimiento : MovimientoInventarioModel) => {
            return movimiento.tipoMovimiento == true;
        });
    }

    getEgresos() : Array<MovimientoInventarioModel> {
        return this.movimientosInventario.filter((movimiento : MovimientoInventarioModel) => {
            return movimiento.tipoMovimiento == false;
        });
    }
}