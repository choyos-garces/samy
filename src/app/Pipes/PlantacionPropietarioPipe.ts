import {Pipe} from "angular2/core";
import {EmpresaModel} from "../Administracion/Models/EmpresaModel";
import {PlantacionModel} from "../Administracion/Models/PlantacionModel";

@Pipe({
    name : 'plantacionPropietario'
})
export class PlantacionPropietarioPipe {
    transform(collection :  PlantacionModel[], arg : EmpresaModel[]) : any[] {
        return (typeof collection != "undefined" && arg[0] != null ) ? collection.filter((plantacion : PlantacionModel) => plantacion.propietario.id == arg[0].id ) : collection;
    }
}