import {Http, Headers, RequestOptions} from "angular2/http";
import {Injectable} from "angular2/core";
import {MaterialModel} from "../Model/Administracion/MaterialModel";
import {BodegaModel} from "../Model/Administracion/BodegaModel";
import {EmpresaModel} from "../Model/Administracion/EmpresaModel";
import {PlantacionModel} from "../Model/Administracion/PlantacionModel";

@Injectable()
export class AdministracionService {
    private url : string;

    constructor(public _http : Http) {
        this.url = "http://localhost/api/public/app_dev.php/administracion/";
    }


    /**
     *
     *
     *
     *
     * Materiales
     */
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


    /**
     *
     *
     *
     *
     * EMPRESAS
     */
    getEmpresas(tipoEmpresa : number) {
        return this._http.get(this.url + "empresas/tipo/" + tipoEmpresa)
            .map(response => <EmpresaModel[]> response.json());
    }

    getEmpresa( id : number ) {
        return this._http.get(this.url + "empresas/" + id)
            .map(response => <EmpresaModel> response.json());
    }

    postEmpresa(empresa : EmpresaModel) {
        let body = JSON.stringify(empresa);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + "empresas/ingresar", body, options)
            .map(response => <EmpresaModel> response.json());
    }


    /**
     *
     *
     *
     *
     * Plantaciones
     */
    getPlantaciones() {
        return this._http.get(this.url + "plantaciones/")
            .map(response => <PlantacionModel[]> response.json());
    }

    getPlantacion( id : number ) {
        return this._http.get(this.url + "plantaciones/" + id)
            .map(response => <PlantacionModel> response.json());
    }

    postPlantacion(plantacion : PlantacionModel) {
        let body = JSON.stringify(plantacion);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + "plantaciones/ingresar", body, options)
            .map(response => <PlantacionModel> response.json());
    }

    
    /**
     *
     *
     *
     *
     * BODEGAS
     */
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