import {Component} from "angular2/core";
import {NotifyService} from "../../../Notify/Services/NotifyService";
import {InventarioService} from "../../Services/InventarioService";
import {MovimientoInventarioModel} from "../../Models/MovimientoInventarioModel";
import {RouteParams, Router, ROUTER_DIRECTIVES} from "angular2/router";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";

@Component({
    selector : 'ver-movimiento',
    pipes : [DatetimePipe],
    directives : [ROUTER_DIRECTIVES],
    template : `
<div class="container-fluid">
    <h4>Detalles del Movimiento #{{ movimientoInventario?.id}}</h4>
    <div class="row">
      <div class="col-sm-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Fecha</dt><dd>{{ movimientoInventario?.fecha | datetime }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Bodega</dt><dd><a [routerLink]="['/Administracion/Bodegas/VerBodega', {id : movimientoInventario?.bodega?.id }]">{{ movimientoInventario?.bodega?.nombre }}</a></dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Materiales</dt><dd>{{ movimientoInventario?.movimientosMateriales?.length }}</dd>
                    </dl>

                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Motivo</dt><dd>{{ movimientoInventario?.motivoMovimiento?.nombre }}</dd>
                    </dl>                   
                </div>
            </div>
        </div>
    </div>
    <h4>Detalle de Materiales</h4>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Codigo</th>
                <th>Material</th>
                <th>Tipo</th>
                <th class="text-center">Cantidad</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="#movimiento of movimientoInventario?.movimientosMateriales" [routerLink]="['/Inventario/InventarioExistente/InventarioDetalle', { materialId : movimiento.material.id, bodegaId : movimiento.bodega.id }]" class="router">
                <td>{{ movimiento.material.codigo }}</td>
                <td><a [routerLink]="['/Administracion/Materiales/VerMaterial', { id : movimiento.material.id }]">{{ movimiento.material.nombre }}</a></td>
                <td>{{ movimiento.material.tipoMaterial.nombre }}</td>
                <td class="text-center">{{ (movimiento.tipoMovimiento == 0) ? "-" : "+" }}{{ movimiento.cantidad }}</td>
                <td class="text-center"><i class="fa fa-ellipsis-v"></i></td>
            </tr>
        </tbody>
    </table>
</div>`
})
export class VerMovimientoComponent {
    movimientoInventario : MovimientoInventarioModel;

    constructor(public _notifyService : NotifyService,
                public _param : RouteParams,
                public _router : Router,
                public _inventarioService : InventarioService) {}

    ngOnInit() {
        const id = parseInt(this._param.get("id"));

        this._notifyService.loader(true);
        this._inventarioService.getMovimiento(id).subscribe(
            movimeintoInventario => {
                this.movimientoInventario = movimeintoInventario;
                console.log(this.movimientoInventario)
                this._notifyService.loader(false);
            },
            error => {
                this._notifyService.error(error.json());
                this._notifyService.loader(false);
                this._router.navigate(['/Inventario/MovimientosInventario/ListaMovimientosInventario']);
            }
        );
    }
}