import {Injectable} from "angular2/core";
import {PlantacionModel} from "../../Model/Recursos/PlantacionModel";
import {ClienteModel} from "../../Model/Recursos/ClienteModel";
import {ClienteService} from "./ClientesService";

@Injectable()
export class PlantacionesService {
    private plantaciones : Array<PlantacionModel>;
    private producto : Array<string>;
    private tipoProducto : Array<string>;
    private unidades : Array<string>;

    constructor(public _clientesService : ClienteService ) {
        this.plantaciones = [];

        this.producto = ["Banano", "Verde"];
        this.tipoProducto = ["Organico", "Convencional"];
        this.unidades = ["ha", "m2"];
        this.plantaciones.push(
            new PlantacionModel(1, 1, "Esmeralda", 0, 0, 230, 1),
            new PlantacionModel(1, 1, "Una Finca", 0, 0, 230, 1),
            new PlantacionModel(1, 1, "La Jaaaciendo", 0, 0, 230, 1),
            new PlantacionModel(1, 1, "Pedro's lands", 1, 1, 230, 1)
        );
    }

    push( plantacion : PlantacionModel) : PlantacionModel {
        return plantacion;
    }

    getById() : PlantacionModel {
        return;
    }

    getByPropietario(propietario : ClienteModel) : Array<PlantacionModel> {
        return;
    }

    getPropietarioById(id : number) : ClienteModel{
        return this._clientesService.getById(id);
    }

    getPlantciones():Array<PlantacionModel> {
        return this.plantaciones
    }
}
