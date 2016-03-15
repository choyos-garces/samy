import {ClienteModel} from "../../Model/Recursos/ClienteModel";

export class PlantacionModel {
    id : number;
    propietario : ClienteModel | number;
    nombre : string;
    producto : number;
    tipo : number;
    tamano : number;
    unit : number;

    constructor(id : number = null, cliente : number | ClienteModel, nombre : string, producto : number, tipo : number, tamano : number, unit : number) {
        this.id = id;
        this.propietario = cliente;
        this.nombre = nombre;
        this.producto = producto;
        this.tipo = tipo;
        this.tamano = tamano;
        this.unit = unit;
    }
}