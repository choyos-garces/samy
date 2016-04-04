import {Injectable} from "angular2/core";
import {SimpleKey} from "../Models/SimpleKey";
import {Http} from "angular2/http";
import {apiService} from "../../apiService";

@Injectable()
export class OpcionesService extends apiService {
    
    constructor(_http : Http) {
        super(_http);
        this.component = "controlPanel";
    }

    getTiposMaterial() {
        return this.get( "opciones", "tiposMaterial").map(response => <SimpleKey[]> response);
    }

    getTiposIdentificacion() {
        return this.get( "opciones", "tiposIdentificacion").map(response => <SimpleKey[]> response);
    }

    getProductosPlantacion() {
        return this.get( "opciones", "productosPlantacion").map(response => <SimpleKey[]> response);
    }

    getTiposProductoPlantacion() {
        return this.get( "opciones", "tiposProductosPlantacion").map(response => <SimpleKey[]> response);
    }
    
    getUnidadesArea() {
        return this.get( "opciones", "unidadesArea").map(response => <SimpleKey[]> response);
    }
    
    getMotivosMovimientoInventario() {
        return this.get( "opciones", "motivosMovimientoInventario").map(response => <SimpleKey[]> response);
    }
}