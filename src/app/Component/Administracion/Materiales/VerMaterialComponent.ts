import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from "angular2/router";

import {MaterialModel} from "../../../Model/Administracion/MaterialModel";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {AdministracionService} from "../../../Service/AdministracionService";

@Component({
    selector  : 'ver-material',
    pipes : [DatetimePipe],
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h3>Material <small>(ID#{{ material?.id }})</small> {{ material?.codigo }}</h3>
        <div class="row">
            <div class="col-xs-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Datos del Material</div>
                    <div class="panel-body">
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Categor&iacute;a</dt><dd>{{ material?.tipo_material?.nombre }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>C&oacute;digo</dt><dd>{{ material?.codigo }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Nombre</dt><dd>{{ material?.nombre }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Fecha Ingreso</dt><dd>{{ material?.fecha | datetime }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class VerMaterialComponent {
    material : MaterialModel;

    constructor(public _administracionService : AdministracionService, 
                public _routeParams : RouteParams, 
                public _router : Router) {}

    ngOnInit() {
        const id = parseInt(this._routeParams.get("id"));
        this._administracionService.getMaterial(id).subscribe(material=> {
            if(material == null) {
                this._router.navigate(["/Error404"])
            }
            this.material = material
        });
    }
}