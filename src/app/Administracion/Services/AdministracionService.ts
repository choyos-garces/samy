import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {MaterialModel} from "../Models/MaterialModel";
import {BodegaModel} from "../Models/BodegaModel";
import {EmpresaModel} from "../Models/EmpresaModel";
import {PlantacionModel} from "../Models/PlantacionModel";
import {apiService} from "../../apiService";

@Injectable()
export class AdministracionService extends apiService{

    constructor(_http : Http) {
        super(_http);
        this.component = "administracion";
    }

    /**
     * Materiales
     */
    getMateriales() {
        return this.get("materiales").map(response => <MaterialModel[]>response);
    }

    getMaterial( id : number ) {
        return this.get("materiales", id).map(response => <MaterialModel> response);
    }

    postMaterial(material : MaterialModel) {
        return this.post("materiales", material).map(response => <MaterialModel> response);
    }


    /**
     * EMPRESAS
     */
    getEmpresas(tipoEmpresa : number) {
        return this.get("empresas/tipo" , tipoEmpresa).map(response => <EmpresaModel[]> response);
    }

    getEmpresa( id : number ) {
        return this.get("empresas", id).map(response => <EmpresaModel> response);
    }

    postEmpresa(empresa : EmpresaModel) {
        return this.post("empresas", empresa).map(response => <EmpresaModel> response);
    }
    
    /**
     * Plantaciones
     */
    getPlantaciones() {
        return this.get("plantaciones").map(response => <PlantacionModel[]> response);
    }

    getPlantacion( id : number ) {
        return this.get("plantaciones/", id).map(response => <PlantacionModel> response);
    }

    postPlantacion(plantacion : PlantacionModel) {
        return this.post("plantaciones", plantacion).map(response => <PlantacionModel> response);
    }
    
    /**
     * BODEGAS
     */
    getBodegas() {
        return this.get("bodegas").map(response => <BodegaModel[]> response);
    }

    getBodega( id : number ) {
        return this.get("bodegas", id).map(response => <BodegaModel> response);
    }

    postBodega(bodega : BodegaModel) {
        return this.post("bodegas", bodega).map(response => <BodegaModel> response);
    }
}