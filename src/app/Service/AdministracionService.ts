import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {SimpleKey} from "../Model/SimpleKey";
import {MaterialModel} from "../Model/Administracion/MaterialModel";

@Injectable()
export class AdministracionService {
    constructor(public _http : Http) {}
    private url : string;

    constructor() {
        this.url = "http://localhost/api/public";
    }

    pushMaterial() {
        return this._http.put(this.url + "/adminstracion/materiales/ingresar/", null);
    }

    getTiposMaterial() {
        return this._http.get(this.url + "/controlPanel/tiposMaterial/")
            .map(response => <SimpleKey[]> response.json());
    }
}