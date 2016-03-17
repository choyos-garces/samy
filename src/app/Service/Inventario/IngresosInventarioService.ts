import {Injectable} from "angular2/core";
import {IngresoInventarioModel} from "../../Model/Inventario/IngresoInventarioModel";

@Injectable()
export class IngresosInventarioService {
    tiposIngreso : Array<string>;
    egresosInventario : Array<IngresoInventarioModel>;
}