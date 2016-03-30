import {Component} from 'angular2/core';
import {PlantacionModel} from "../../Models/PlantacionModel";
import {RouteParams, Router, ROUTER_DIRECTIVES} from "angular2/router";
import {AdministracionService} from "../../Services/AdministracionService";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";

@Component({
    selector  : 'ver-plantacion',
    pipes : [DatetimePipe],
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Plantaci&oacute;n <small>id#{{ plantacion?.id }}</small></h4>
        <div class="row">
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Detalles de Plantaci&oacute;n</div>
                    <div class="panel-body">
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Nombre</dt><dd>{{ plantacion?.nombre}}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Tama&ntilde;o</dt><dd>{{ plantacion?.tamano }} {{ plantacion?.unidad?.nombre }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Producto</dt><dd>{{ plantacion?.producto?.nombre }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Tipo de Producto</dt><dd>{{ plantacion?.tipoProducto?.nombre }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Fecha</dt><dd>{{ plantacion?.fecha | datetime }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Propietario</dt><dd><a [routerLink]="['../../Productores/VerProductor', { id : plantacion?.propietario?.id }]">{{ plantacion?.propietario?.razonSocial }}</a></dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class VerPlantacionComponent {
    plantacion : PlantacionModel;

    constructor(public _routeParams : RouteParams, 
                public _router : Router, 
                public _administracionService : AdministracionService) {}

    ngOnInit() {
        const id = parseInt(this._routeParams.get("id"));
        this._administracionService.getPlantacion(id).subscribe(plantacion => {
            if(plantacion == null) this._router.navigate(["/Error404"]);
            this.plantacion = plantacion
        });
        
    }
}