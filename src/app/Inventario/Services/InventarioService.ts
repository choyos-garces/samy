import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {apiService} from "../../apiService";
import {MovimientoInventarioModel} from "../Models/MovimientoInventarioModel";

@Injectable()

export class InventarioService extends apiService {
    constructor(_http : Http) {
        super(_http);
        this.component = "inventario";
    }

    /**
     * Existentes
     */
    getExistente() {
        return this.get("existente").map(response => response.inventarios);
    }

    getInventarioDetall( materialId : number, bodegaId : number ) {
        const param = "material/" + materialId + "/bodega/" + bodegaId;
        return this.get("existente", param).map(response => response );
    }
    /**
     * Movimiento
     */
    getMovimientos() {
        return this.get("movimientos").map(response => <MovimientoInventarioModel[]> response.movimientos);
    }
    
    getMovimiento( id : number ) {
        return this.get("movimientos", id).map(response => <MovimientoInventarioModel> response);
    }
    
    postMovimiento( moviento : MovimientoInventarioModel ) {
        return this.post("movimientos", moviento).map(response => <MovimientoInventarioModel> response);
    }
}