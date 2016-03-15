import {ClienteModel} from "../../Model/Recursos/ClienteModel";

export class PlantacionModel {
    id : number;
    propietario : ClienteModel;
    nombre : string;
    producto : number;
    tipo : number;
    tamano : number;
    unidad : number;

    constructor(id : number = null, propietario : ClienteModel, nombre : string, producto : number, tipo : number, tamano : number, unidad : number) {
        this.id = id;
        this.propietario = propietario;
        this.nombre = nombre;
        this.producto = producto;
        this.tipo = tipo;
        this.tamano = tamano;
        this.unidad = unidad;
    }
}