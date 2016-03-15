import {PlantacionModel} from "./PlantacionModel";

export class ClienteModel {
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

    constructor(cliente : any, flagRazon : boolean = false, flagCorreo : boolean = false) {
        this.id = cliente.id;
        this.nombre = cliente.nombre;
        this.razon = (flagRazon) ? cliente.nombre : cliente.razon;
        this.numeroTelefono = cliente.numeroTelefono;
        this.tipoIdentificacion = cliente.tipoIdentificacion;
        this.identificacion = cliente.identificacion;
        this.correoContacto = cliente.correoContacto;
        this.correoNotificaciones = (flagCorreo) ? cliente.correoContacto : cliente.correoNotificaciones;
        this.fechaIngreso  = cliente.fechaIngreso;
        
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