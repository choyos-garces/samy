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
     * Movimiento
     */
    getMovimientos() {
        
    }
    
    getMovimiento( id : number ) {
        
    }
    
    postMovimiento( moviento : MovimientoInventarioModel ) {
        window["test"] = JSON.stringify(moviento);
    }
}