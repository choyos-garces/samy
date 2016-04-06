import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from "angular2/router";

import {MaterialModel} from "../../Models/MaterialModel";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {AdministracionService} from "../../Services/AdministracionService";
import {Controller} from "../../../ControlPanel/Controller";
import {NotifyService} from "../../../Notify/Services/NotifyService";
import {InventarioService} from "../../../Inventario/Services/InventarioService";
import {InventarioMaterialModel} from "../../../Inventario/Models/InventarioMaterialModel";

@Component({
    selector  : 'ver-material',
    pipes : [DatetimePipe],
    directives : [ROUTER_DIRECTIVES],
    template : `
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-6">
            <h4>Material #{{ material?.id }}</h4>
            <div class="panel panel-default">
                <div class="panel-body">
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Categor&iacute;a</dt><dd>{{ material?.tipoMaterial?.nombre }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>C&oacute;digo</dt><dd>{{ material?.codigo }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Nombre</dt><dd>{{ material?.nombre }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Cantidad</dt><dd>{{ material?.cantidad }}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
    <h4>Inventario en Bodegas</h4>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th class="text-center">Codigo</th>
                    <th>Bodega</th>
                    <th class="text-center">Total</th>
                    <th class="text-center">Ult. Movimiento</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#inventario of inventarioMaterial" [routerLink]="['/Inventario/InventarioExistente/InventarioDetalle', { materialId : inventario.material.id , bodegaId : inventario.bodega.id}]" class="router">
                    <td class="text-center">{{ inventario.bodega.codigo }}</td>
                    <td><a [routerLink]="['/Administracion/Bodegas/VerBodega', {id : inventario.bodega.id}]">{{ inventario.bodega.nombre }}</a></td>
                    <td class="text-center">{{ inventario.cantidad }}</td>
                    <td class="text-center">{{ inventario.fecha | datetime : 'short' }}</td>
                    <td><i class="fa fa-ellipsis-v"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`
})
export class VerMaterialComponent extends Controller {
    material : MaterialModel;
    inventarioMaterial : InventarioMaterialModel[];

    constructor(public _administracionService : AdministracionService,
                public _inventarioService : InventarioService,
                public _routeParams : RouteParams, 
                public _router : Router,
                _notifyService : NotifyService) { super(_notifyService) }

    ngOnInit() {
        const id = parseInt(this._routeParams.get("id"));

        this._notifyService.loader(true);
        this.subscribeResource("material",this._administracionService.getMaterial(id));
        this.subscribeResource("inventarioMaterial", this._inventarioService.getInventarioByMaterial(id));
    }
}