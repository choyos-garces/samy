import {Component} from 'angular2/core';
import {PlantacionModel} from "../../../Model/Administracion/PlantacionModel";
import {PlantacionesService} from "../../../Service/Administracion/PlantacionesService";
import {RouteParams, Router, ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector  : 'ver-plantacion',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Plantaci&oacute;n #{{ plantacion.id }}</h4>
        <div class="row">
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Detalles de Plantaci&oacute;n</div>
                    <div class="panel-body">
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>Nombre</dd><dt>{{ plantacion.nombre}}</dt>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>Tama&ntilde;o</dd><dt>{{ plantacion.tamano }} {{ plantacion.unidad.label }}</dt>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>Producto</dd><dt>{{ plantacion.producto.label }}</dt>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>Tipo de Producto</dd><dt>{{ plantacion.tipo.label }}</dt>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>Fecha</dd><dt>{{ plantacion.fecha | date }}</dt>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>Propietario</dd><dt><a [routerLink]="['../../Productores/VerProductor', { id : plantacion.propietario.id }]">{{ plantacion.propietario.nombre }}</a></dt>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class VerPlantacionComponent {
    plantacion : PlantacionModel;

    constructor(public _plantacionesService : PlantacionesService, public _routeParams : RouteParams, public _router : Router) {}

    ngOnInit() {
        const id = parseInt(this._routeParams.get("id"));
        this.plantacion = this._plantacionesService.getById(id);
        if(this.plantacion == null) this._router.navigate(["/Error404"]);
    }
}