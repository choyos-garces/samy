import {Component} from "angular2/core";
import {RouteParams, ROUTER_DIRECTIVES, Router} from "angular2/router";

import {InventarioService} from "../../Services/InventarioService";
import {NotifyService} from "../../../Notify/Services/NotifyService";

import {DatetimePipe} from "../../../Pipes/DatetimePipe";

import {MovimientoMaterialModel} from "../../Models/MovimientoMaterialModel";
import {InventarioMaterialModel} from "../../Models/InventarioMaterialModel";

@Component({
    selector : 'inventario-detalle',
    pipes : [DatetimePipe],
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
    <h4>Detalle de Inventario</h4>
    <div class="row">
        <div class="col-sm-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Material</dt><dd><a [routerLink]="['/Administracion/Materiales/VerMaterial', { id : inventario?.material?.id }]">{{ inventario?.material?.nombre }}</a></dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Codigo</dt><dd>{{ inventario?.material?.codigo }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Tipo</dt><dd>{{ inventario?.material?.tipoMaterial?.nombre }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Total</dt><dd>{{ inventario?.material?.cantidad }}</dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Bodega</dt><dd><a [routerLink]="['/Administracion/Bodegas/VerBodega', { id : inventario?.bodega?.id }]">{{ inventario?.bodega?.nombre }}</a></dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Codigo</dt><dd>{{ inventario?.bodega?.codigo }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>En bodega</dt><dd>{{ inventario?.cantidad }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Ultimo Ingreso</dt><dd>{{ inventario?.fecha | datetime }}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
    <h4>Movimientos de Inventario</h4>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Fecha</th>
                <th class="text-center">Antes</th>
                <th class="text-center">Cantidad</th>
                <th class="text-center">Total</th>
                <th class="text-center"></th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="#movimiento of movimientosMateriales" [routerLink]="['/Inventario/MovimientosInventario/VerMovimientoInventario', { id : movimiento.movimientoInventario.id }]" class="router">
                <td>{{ movimiento.fecha | datetime }}</td>
                <td class="text-center">{{ movimiento.cantidadPrevia }}</td>
                <td class="text-center">{{ (movimiento.tipoMovimiento == 0) ? "-" : "+" }}{{ movimiento.cantidad }}</td>
                <td class="text-center">{{ total(movimiento.tipoMovimiento, movimiento.cantidadPrevia, movimiento.cantidad) }}</td>
                <td class="text-center"><i class="fa fa-ellipsis-v"></i></td>
            </tr>
        </tbody>
    </table>
</div>`
})
export class InventarioDetalleComponent {
    inventario : InventarioMaterialModel;
    movimientosMateriales : MovimientoMaterialModel[];

    constructor(public _invetarioService : InventarioService,
                public _notifyService : NotifyService,
                public _router : Router,
                public _param : RouteParams) {}

    ngOnInit() {
        const materialId = parseInt(this._param.get("materialId"));
        const bodegaId = parseInt(this._param.get("bodegaId"));

        this._notifyService.loader(true);
        this._invetarioService.getInventarioDetall(materialId, bodegaId).subscribe(
            response => {
                this.inventario = response.inventario;
                this.movimientosMateriales = <MovimientoMaterialModel[]>response.movimientos;
            },
            error => {
                this._notifyService.error(error.json());
                this._notifyService.loader(false);
                this._router.navigate(['/Inventario/InventarioExistente/ListaInventarioExistente'])
            },
            () => this._notifyService.loader(false)
        );
    }

    total(operacion, previo, final) {
        previo = parseFloat(previo);
        final = parseFloat(final);
        return operacion == 0 ?
            previo - final :
            previo + final;
    }
}