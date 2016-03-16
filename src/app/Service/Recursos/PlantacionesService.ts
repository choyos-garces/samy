import {Injectable} from "angular2/core";
import {PlantacionModel} from "../../Model/Recursos/PlantacionModel";
import {ProductorModel} from "../../Model/Recursos/ProductorModel";
import {ProductoresService} from "./ProductoresService";

@Injectable()
export class PlantacionesService {
    private plantaciones : Array<PlantacionModel>;
    private productos : Array<string>;
    private tipos : Array<string>;
    private unidades : Array<string>;

    constructor(public _clientesService : ProductoresService ) {
        this.plantaciones = [];
        let clientes = this._clientesService.getProductores();

        this.productos = ["Banano", "Verde"];
        this.tipos = ["Organico", "Convencional"];
        this.unidades = ["ha", "m2"];

        this.plantaciones.push(
            new PlantacionModel(1, clientes[Math.floor(Math.random()*clientes.length)], "Esmeralda", 1, 0, 230, 0),
            new PlantacionModel(2, clientes[Math.floor(Math.random()*clientes.length)], "Una Finca", 0, 0, 230, 1),
            new PlantacionModel(3, clientes[Math.floor(Math.random()*clientes.length)], "La Jaaaciendo", 0, 0, 230, 0),
            new PlantacionModel(4, clientes[Math.floor(Math.random()*clientes.length)], "Pedro's lands", 1, 1, 230, 1)
        );
    }

    push( plantacion : PlantacionModel) : PlantacionModel {
        plantacion.id = this.plantaciones[this.plantaciones.length-1].id + 1;
        this.plantaciones.push(plantacion);

        return plantacion;
    }

    getById() : PlantacionModel {
        return;
    }

    getByPropietario(propietario : ProductorModel) : Array<PlantacionModel> {
        return this.getPlantaciones().filter(function (plantacion : PlantacionModel ) {
            return plantacion.propietario.id == propietario.id;
        });
    }

    getPlantaciones():Array<PlantacionModel> {
        return this.plantaciones
    }

    getTipos() : Array<string> {
        return this.tipos;
    }

    getProductos() : Array<string> {
        return this.productos;
    }

    getUnidades() : Array<string> {
        return this.unidades;
    }
}
