import {PlantacionModel} from "./PlantacionModel";

export class ProductorModel {
    id : number;
    nombre : string;
    razon : string;
    numeroTelefono : string;
    tipoIdentificacion : number;
    identificacion : string;
    correoContacto : string;
    correoNotificaciones : string;
    fechaIngreso : Date;
    plantaciones : Array<PlantacionModel>;

    constructor(productor : any, flagRazon : boolean = false, flagCorreo : boolean = false) {
        this.id = productor.id;
        this.nombre = productor.nombre;
        this.razon = (flagRazon) ? productor.nombre : productor.razon;
        this.numeroTelefono = productor.numeroTelefono;
        this.tipoIdentificacion = productor.tipoIdentificacion;
        this.identificacion = productor.identificacion;
        this.correoContacto = productor.correoContacto;
        this.correoNotificaciones = (flagCorreo) ? productor.correoContacto : productor.correoNotificaciones;
        this.fechaIngreso  = productor.fechaIngreso;

        this.plantaciones = [];
    }

    addPlantaciones(plantaciones : Array<PlantacionModel>) : void {
        this.plantaciones = plantaciones;
    }

    addPlantacion(plantacion : PlantacionModel) : void {
        this.plantaciones.push(plantacion);
    }

    getPlantacion(index : number) : PlantacionModel {
        return this.plantaciones[0]
    }

    getFechaIngreso() : string {
        var date = this.fechaIngreso;
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

}