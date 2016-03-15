import {Component} from "angular2/core";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";

import {ClienteService} from "../../../Service/Recursos/ClientesService";
import {ClienteModel} from "../../../Model/Recursos/ClienteModel";
import {RouteParams} from "angular2/router";
import {PlantacionModel} from "../../../Model/Recursos/PlantacionModel";
import {PlantacionesService} from "../../../Service/Recursos/PlantacionesService";

@Component({
    selector : 'ver-cliente',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h3>{{ cliente.razon }} <small>{{ cliente.cliente }}</small></h3>
        <div class="row">
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <strong>Datos de Cliente</strong>
                    </div>
                    <div class="panel-body">
                        <dl class="dl-horizontal">
                            <dt>Codigo</dt>
                            <dd>{{ cliente.id }}</dd>
                            <dt>Numero Tel&eacute;fono</dt>
                            <dd>{{ cliente.numeroTelefono }}</dd>
                            <dt>{{ tipoIdentificacion }}</dt>
                            <dd>{{ cliente.identificacion }}</dd>
                            <dt>Correo Contacto</dt>
                            <dd>{{ cliente.correoContacto }}</dd>
                            <dt>Correo Notificaciones</dt>
                            <dd>{{ cliente.correoNotificaciones }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <strong>Plantaciones</strong>
                        <button type="button" class="action">Anadir <i class="fa fa-plus"></i></button>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Producto</th>
                                <th>Tipo</th>
                                <th>Tama&ntilde;o</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="#plantacion of plantaciones" [routerLink]="['VerPlantacion', { id : plantacion.id }]" class="router">
                                <td>{{ plantacion.nombre }}</td>
                                <td>{{ productos[plantacion.producto] }}</td>
                                <td>{{ tipos[plantacion.tipo] }}</td>
                                <td>{{ plantacion.tamano }} {{ unidades[plantacion.unidad] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`
})
export class VerClienteComponent {
    id : number;
    cliente : ClienteModel;
    tipoIdentificacion : string;
    plantaciones : Array<PlantacionModel>;
    tipos : Array<string>;
    productos : Array<string>;
    unidades : Array<string>;

    constructor(public _router : Router,
                public _routerParams : RouteParams,
                public _clientesService : ClienteService,
                public _plantacionesService : PlantacionesService ){
        this.id = parseInt(this._routerParams.get('id'));
        this.cliente = this._clientesService.getById(this.id);

        if(this.cliente == null) {
            this._router.navigate(['ListaClientes', { redirect : 404 }])
        }
        else {
            this.plantaciones = this._plantacionesService.getByPropietario(this.cliente);
            this.tipos = this._plantacionesService.getTipos();
            this.productos = this._plantacionesService.getProductos();
            this.unidades = this._plantacionesService.getUnidades();

            this.tipoIdentificacion = this._clientesService.getTipoIdentificacion(this.cliente.tipoIdentificacion);
        }


    }
}
