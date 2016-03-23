import {Http, Headers, RequestOptions} from "angular2/http";
import {Injectable} from "angular2/core";
import {MaterialModel} from "../Model/Administracion/MaterialModel";
import {BodegaModel} from "../Model/Administracion/BodegaModel";

@Injectable()
export class AdministracionService {
    private url : string;

    constructor(public _http : Http) {
        this.url = "http://localhost/api/public/app_dev.php/administracion/";
    }

    getMateriales() {
        return this._http.get(this.url + "materiales")
            .map(response => <MaterialModel[]> response.json());
    }

    getMaterial( id : number ) {
        return this._http.get(this.url + "materiales/" + id)
            .map(response => <MaterialModel> response.json());
    }

    postMaterial(material : MaterialModel) {
        let body = JSON.stringify(material);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + "materiales/ingresar", body, options)
            .map(response => <MaterialModel> response.json());
    }

    getBodegas() {
        return this._http.get(this.url + "bodegas")
            .map(response => <BodegaModel[]> response.json());
    }

    getBodega( id : number ) {
        return this._http.get(this.url + "bodegas/" + id)
            .map(response => <BodegaModel> response.json());
    }

    postBodega(bodega : BodegaModel) {
        let body = JSON.stringify(bodega);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url + "bodegas/ingresar", body, options)
            .map(response => <BodegaModel> response.json());
    }
}