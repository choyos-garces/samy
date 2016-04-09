import {SimpleKey} from "../../App/Models/SimpleKey";

export class EmpresaModel {
    private _id : number;
    private _razonSocial : string;
    private _identificacion : string;
    private _tipoIdentificacion : SimpleKey;
    private _telefono : string;
    private _correo : string;
    private _direccion : string;
    private _fecha : Date | string;
    private _tipo_empresa : string;
    
    constructor(id:number, razon_social:string, indentificacion:string, tipo_identificacion:SimpleKey, telefono:string, correo:string, direccion:string, tipoEmpresa : string, fecha?:Date|string) {
        this._id = id;
        this._razonSocial = razon_social;
        this._identificacion = indentificacion;
        this._tipoIdentificacion = tipo_identificacion;
        this._telefono = telefono;
        this._correo = correo;
        this._direccion = direccion;
        this._tipo_empresa = tipoEmpresa;
        this._fecha = fecha;
    }

    get id():number {
        return this._id;
    }

    get razonSocial():string {
        return this._razonSocial;
    }

    get identificacion():string {
        return this._identificacion;
    }

    get tipoIdentificacion():SimpleKey {
        return this._tipoIdentificacion;
    }

    get telefono():string {
        return this._telefono;
    }

    get correo():string {
        return this._correo;
    }

    get direccion():string {
        return this._direccion;
    }

    get fecha():Date|string {
        return this._fecha;
    }

    get tipo_empresa():string {
        return this._tipo_empresa;
    }

    toJSON() {
        return {
            id : this.id,
            razonSocial : this.razonSocial,
            tipoIdentificacion : this.tipoIdentificacion,
            identificacion : this.identificacion,
            telefono : this.telefono,
            correo : this.correo,
            direccion : this.direccion,
            tipoEmpresa: this.tipo_empresa,
            fecha : this.fecha
        }
    }
}