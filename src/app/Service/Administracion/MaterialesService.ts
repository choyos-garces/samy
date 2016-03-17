import {Injectable} from "angular2/core";
import {MaterialModel} from "../../Model/Administracion/MaterialModel";

@Injectable()
export class MaterialesService {
    private tiposMaterial : Array<string>;
    private materiales : Array<MaterialModel>;

    constructor() {
        this.tiposMaterial = [
            "Fundas",
            "Material Post Cosecha",
            "Etiquetas y bandas para proceso",
            "Datos de tipo carton",
            "Materiales de Paletizado",
            "Sticker de Corte"
        ];

        this.materiales = [];
        this.materiales.push(
            new MaterialModel("CA-001", "Cosa A", 1, 1),
            new MaterialModel("CA-002", "Cosa B", 1, 2),
            new MaterialModel("CB-001", "Cosa C", 2, 3),
            new MaterialModel("CB-002", "Cosa D", 2, 4),
            new MaterialModel("CC-001", "Cosa E", 3, 5),
            new MaterialModel("CC-002", "Cosa F", 3, 6),
            new MaterialModel("CD-001", "Cosa G", 4, 7),
            new MaterialModel("CD-002", "Cosa H", 4, 8)
        );
    }

    getTipoMaterial(index : number) : string {
        return this.tiposMaterial[index];
    }

    getMateriales() : Array<MaterialModel> {
        return this.materiales;
    }

    push(material : MaterialModel) : MaterialModel {
        material.id = this.materiales[this.materiales.length-1].id + 1;
        this.materiales.push(material);

        return material;
    }

    getById(id : number) : MaterialModel {
        let materiales = this.getMateriales();
        materiales.filter(function(material : MaterialModel) {
           return material.id == id;
        });

        return materiales[0];
    }

    getTiposMaterial():Array<string> {
        return this.tiposMaterial;
    }
}