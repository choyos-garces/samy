import {Injectable} from "angular2/core";
import {EgresoInventarioModel} from "../../Model/Inventario/EgresoInventarioModel";

@Injectable()
export class EgresosInventarioService {
    tiposEgresos : Array<string>;
    egresosInventario : Array<EgresoInventarioModel>;
}