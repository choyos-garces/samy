import {Injectable} from "angular2/core";
import {SimpleKey} from "../Model/SimpleKey";
import {Http} from "angular2/http";

@Injectable()
export class OpcionesService {
    private url : string;

    constructor(public _http : Http) {
        this.url = "http://localhost/api/public/app_dev.php/controlPanel/opciones/";
    }

    getTiposMaterial() {
        return this._http.get(this.url + "tiposMaterial")
            .map(response => <SimpleKey[]> response.json());
    }

    getTiposIdentificacion() {
        return this._http.get(this.url + "tiposIdentificacion")
            .map(response => <SimpleKey[]> response.json());
    }

    getProductosPlantacion() {
        return this._http.get(this.url + "productosPlantacion")
            .map(response => <SimpleKey[]> response.json());
    }

    getTiposProductoPlantacion() {
        return this._http.get(this.url + "tiposProductosPlantacion")
            .map(response => <SimpleKey[]> response.json());
    }
    
    getUnidadesArea() {
        return this._http.get(this.url + "unidadesArea")
            .map(response => <SimpleKey[]> response.json());
    }


    
}