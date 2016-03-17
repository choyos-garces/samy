import {Injectable} from "angular2/core";
import {ProveedorModel} from "../../Model/Administracion/ProveedorModel";

@Injectable()
export class ProveedoresService {
    proveedores : Array<ProveedorModel> = [];
    private tiposIdentificaciones : Array<string>;

    constructor() {

        this.tiposIdentificaciones = [
            "Cédula",
            "R.U.C."
        ];

        let i : number = 1;
        this.proveedores.push(
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com"),
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com"),
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com"),
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com"),
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com"),
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com"),
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com"),
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com"),
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com"),
            new ProveedorModel(i++, i + " choyos", 1, "0999156" + i, i + "0425566", "La calle " + i, "ab" + i + "@.com")
        );
    }

    getTipoIdentificacion(index : number) : string {
        return this.tiposIdentificaciones[index];
    }

    push(productor : ProveedorModel) : ProveedorModel {
        productor.id = (this.proveedores.length != 0) ? this.proveedores[this.proveedores.length - 1].id + 1 : 1;
        this.proveedores.push(productor);

        return productor;
    }
    getProveedores():Array<ProveedorModel> {
        return this.proveedores;
    }

    getById(id : number ) : ProveedorModel {
        this.getProveedores();
        let resultado = this.proveedores.filter((cliente : ProveedorModel) => {
            return cliente.id == id;
        });

        return (resultado.length == 1) ? resultado[0] : null;
    }

    getTiposIdentificaciones():Array<string> {
        return this.tiposIdentificaciones;
    }
}