import {ProductorModel} from "./ProductorModel";
import {SimpleKey} from "../SimpleKey";

export class PlantacionModel {
    id : number;
    propietario : ProductorModel;
    nombre : string;
    producto : SimpleKey;
    tipo : SimpleKey;
    tamano : number;
    unidad : SimpleKey;
    fecha : Date;

    constructor(id : number = null, propietario : ProductorModel, nombre : string, producto : SimpleKey, tipo : SimpleKey, tamano : number, unidad : SimpleKey, fecha : Date = new Date) {
        this.id = id;
        this.propietario = propietario;
        this.nombre = nombre;
        this.producto = producto;
        this.tipo = tipo;
        this.tamano = tamano;
        this.unidad = unidad;
        this.fecha = fecha;
    }
}