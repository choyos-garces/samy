import {Component} from 'angular2/core';
import {AdministracionService} from "../../../Service/AdministracionService";
import {BodegaModel} from "../../../Model/Administracion/BodegaModel";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {Router, RouteParams} from "angular2/router";

@Component({
    selector  : 'ver-bodega',
    pipes : [DatetimePipe],
    template : `<div class="container-fluid">
        <h4>Material <small>id#{{ bodega?.id }}</small></h4>
        <div class="row">
            <div class="col-xs-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Datos del Material</div>
                    <div class="panel-body">
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>C&oacute;digo</dt><dd>{{ bodega?.codigo }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Nombre</dt><dd>{{ bodega?.nombre }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Fecha Ingreso</dt><dd>{{ bodega?.fecha | datetime }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class VerBodegaComponent {
    bodega:BodegaModel;

    constructor(public _administracionService:AdministracionService,
                public _routeParams:RouteParams,
                public _router:Router) {}

    ngOnInit() {
        const id = parseInt(this._routeParams.get("id"));
        this._administracionService.getBodega(id).subscribe(bodega=> {
            if(bodega == null) {
                this._router.navigate(["/Error404"])
            }
            this.bodega = bodega
        });
    }
}