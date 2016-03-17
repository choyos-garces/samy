import {Injectable} from "angular2/core";
import {MovimientoInventarioModel} from "../../Model/Inventario/MovimientoInventarioModel";
import {MaterialesService} from "../Administracion/MaterialesService";
import {MaterialModel} from "../../Model/Administracion/MaterialModel";

@Injectable()
export class MovimientosInventarioService {
    tiposMovimiento : Array<string>;
    movimientosInventario : Array<MovimientoInventarioModel>;

    constructor(public _materialesServices : MaterialesService) {
        this.tiposMovimiento = ["Ingreso" , "Egresos"];
        const materiales : Array<MaterialModel> = this._materialesServices.getMateriales();

        let i = 1;
        this.movimientosInventario = [];
        this.movimientosInventario.push(
            new MovimientoInventarioModel(i, true, materiales[Math.floor(Math.random()*materiales.length)], Math.floor(Math.random()*200), 2),
            new MovimientoInventarioModel(i, true, materiales[Math.floor(Math.random()*materiales.length)], Math.floor(Math.random()*200), 2),
            new MovimientoInventarioModel(i, true, materiales[Math.floor(Math.random()*materiales.length)], Math.floor(Math.random()*200), 2),
            new MovimientoInventarioModel(i, true, materiales[Math.floor(Math.random()*materiales.length)], Math.floor(Math.random()*200), 2),
            new MovimientoInventarioModel(i, true, materiales[Math.floor(Math.random()*materiales.length)], Math.floor(Math.random()*200), 2),
            new MovimientoInventarioModel(i, true, materiales[Math.floor(Math.random()*materiales.length)], Math.floor(Math.random()*200), 2)
        );

    }
}