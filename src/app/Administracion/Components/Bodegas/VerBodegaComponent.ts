import {Component} from 'angular2/core';
import {AdministracionService} from "../../Services/AdministracionService";
import {BodegaModel} from "../../Models/BodegaModel";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {NotifyService} from "../../../Notify/Services/NotifyService";
import {Controller} from "../../../ControlPanel/Controller";
import {InventarioService} from "../../../Inventario/Services/InventarioService";
import {InventarioMaterialModel} from "../../../Inventario/Models/InventarioMaterialModel";

@Component({
    selector  : 'ver-bodega',
    pipes : [DatetimePipe],
    directives : [ROUTER_DIRECTIVES],
    template : `
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-6">
            <h4>Bodega #{{ bodega?.id }}</h4>
            <div class="panel panel-default">
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
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Materiales</dt><dd>{{ inventarioBodega?.length }}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
    <h4>Inventario en Bodega</h4>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th class="text-center">Codigo</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th class="text-center">Total</th>
                    <th class="text-center">Ult. Movimiento</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#inventario of inventarioBodega" [routerLink]="['/Inventario/InventarioExistente/InventarioDetalle', { materialId : inventario.material.id , bodegaId : inventario.bodega.id}]" class="router">
                    <td class="text-center">{{ inventario.material.codigo }}</td>
                    <td><a [routerLink]="['/Administracion/Materiales/VerMaterial', {id : inventario.material.id}]">{{ inventario.material.nombre }}</a></td>
                    <td>{{ inventario.material.tipoMaterial.nombre }}</td>
                    <td class="text-center">{{ inventario.cantidad }}</td>
                    <td class="text-center">{{ inventario.fecha | datetime : 'short' }}</td>
                    <td><i class="fa fa-ellipsis-v"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`
})
export class VerBodegaComponent extends Controller {
    bodega : BodegaModel;
    inventarioBodega : InventarioMaterialModel[];

    constructor(public _administracionService: AdministracionService,
                public _inventarioService : InventarioService,
                public _params : RouteParams,
                public _router : Router,
                _notifyService : NotifyService) { super(_notifyService) }

    ngOnInit() {
        const id = parseInt(this._params.get("id"));

        this._notifyService.loader(true);
        this.subscribeResource("bodega", this._administracionService.getBodega(id));
        this.subscribeResource("inventarioBodega", this._inventarioService.getInventarioByBodega(id))
    }
}