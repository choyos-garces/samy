import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from "angular2/router";

import {MaterialesService} from "../../../Service/Administracion/MaterialesService";
import {MaterialModel} from "../../../Model/Administracion/MaterialModel";

@Component({
    selector  : 'ver-material',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h3>Material: {{ material.id }}-{{ material.codigo }}</h3>
        <div class="row">
            <div class="col-xs-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Datos del Material</div>
                    <div class="panel-body">
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>Categor&iacute;a</dd><dt>{{ material.tipo.label }}</dt>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>C&oacute;digo</dd><dt>{{ material.codigo }}</dt>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>Nombre</dd><dt>{{ material.nombre }}</dt>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dd>Fecha Ingreso</dd><dt>{{ material.fecha | date }}</dt>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class VerMaterialComponent {
    material : MaterialModel;

    constructor(public _materialesService : MaterialesService, public _routeParams : RouteParams, public _router : Router) {}

    ngOnInit() {
        const id = parseInt(this._routeParams.get("id"));
        this.material = this._materialesService.getById(id);

        if(this.material == null) this._router.navigate(["/Error404"]);
    }
}