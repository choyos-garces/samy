import {SimpleKey} from "../../App/Models/SimpleKey";
import {EmpresaModel} from "./EmpresaModel";

export class PlantacionModel {
    private _id : number;
    private _propietario : EmpresaModel;
    private _nombre : string;
    private _producto : SimpleKey;
    private _tipoProducto : SimpleKey;
    private _tamano : number;
    private _unidad : SimpleKey;
    private _fecha : Date;

    constructor(id : number = null, propietario : EmpresaModel, nombre : string, producto : SimpleKey, tipo : SimpleKey, tamano : number, unidad : SimpleKey, fecha : Date = new Date) {
        this._id = id;
        this._propietario = propietario;
        this._nombre = nombre;
        this._producto = producto;
        this._tipoProducto = tipo;
        this._tamano = tamano;
        this._unidad = unidad;
        this._fecha = fecha;
    }

    get id():number {
        return this._id;
    }

    get propietario():EmpresaModel {
        return this._propietario;
    }

    get nombre():string {
        return this._nombre;
    }

    get producto():SimpleKey {
        return this._producto;
    }

    get tipoProducto():SimpleKey {
        return this._tipoProducto;
    }

    get tamano():number {
        return this._tamano;
    }

    get unidad():SimpleKey {
        return this._unidad;
    }

    get fecha():Date {
        return this._fecha;
    }
    
    toJSON() {
        return {
            id: this.id,
            propietario: this.propietario,
            nombre: this.nombre,
            producto: this.producto,
            tipoProducto: this.tipoProducto,
            tamano: this.tamano,
            unidad: this.unidad,
            fecha: this.fecha
        }
    }
}