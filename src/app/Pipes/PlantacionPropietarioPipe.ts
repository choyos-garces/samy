import {Pipe} from "angular2/core";
import {EmpresaModel} from "../Model/Administracion/EmpresaModel";
import {PlantacionModel} from "../Model/Administracion/PlantacionModel";

@Pipe({
    name : 'plantacionPropietario'
})
export class PlantacionPropietarioPipe {
    transform(collection :  PlantacionModel[], arg : EmpresaModel[]) : any[] {
        return (typeof collection != "undefined" && arg[0] != null ) ? collection.filter((plantacion : PlantacionModel) => plantacion.propietario.id == arg[0].id ) : collection;
    }
}