import {Component} from "angular2/core";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";

import {ProductoresService} from "../../../Service/Administracion/ProductoresService";
import {ProductorModel} from "../../../Model/Administracion/ProductorModel";
import {RouteParams} from "angular2/router";
import {PlantacionModel} from "../../../Model/Administracion/PlantacionModel";
import {PlantacionesService} from "../../../Service/Administracion/PlantacionesService";

@Component({
    selector : 'ver-productor',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h3>Productor</h3>
        <div class="row">
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Datos de Cliente</div>
                    <div class="panel-body">
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Codigo</dt>
                            <dd>{{ productor.id }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Numero Tel&eacute;fono</dt>
                            <dd>{{ productor.numeroTelefono }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>{{ tiposIdentificacion[productor.tipoIdentificacion] }}</dt>
                            <dd>{{ productor.identificacion }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Correo Contacto</dt>
                            <dd>{{ productor.correoContacto }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Correo Notificaciones</dt>
                            <dd>{{ productor.correoNotificaciones }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Plantaciones
                        <a class="pull-right" [routerLink]="['../../Plantacion/IngresarPlantacion', { productor : productor.id }]"><i class="fa fa-plus fa-fw"></i> Anadir</a>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Producto</th>
                                <th>Tipo</th>
                                <th>Tama&ntilde;o</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="#plantacion of plantaciones" [routerLink]="['../../Plantacion/VerPlantacion', { id : plantacion.id}]" class="router">
                                <td>{{ plantacion.nombre }}</td>
                                <td>{{ plantacion.producto.label }}</td>
                                <td>{{ plantacion.tipo.label }}</td>
                                <td>{{ plantacion.tamano }} {{ plantacion.unidad.label }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`
})
export class VerProductorComponent {
    productor : ProductorModel;
    tiposIdentificacion : Array<string>;
    plantaciones : Array<PlantacionModel>;

    constructor(public _router : Router,
                public _routerParams : RouteParams,
                public _productoresService : ProductoresService,
                public _plantacionesService : PlantacionesService ) {}

    ngOnInit() {
        const id = parseInt(this._routerParams.get('id'));
        this.productor = this._productoresService.getById(id);
        if(this.productor == null) this._router.navigate(['/Error404']);

        this.plantaciones = this._plantacionesService.getByPropietario(this.productor);
        this.tiposIdentificacion = this._productoresService.getTiposIdentificacion();
    }
}
