import {Component} from "angular2/core";
import {NotifyService} from "../../../Notify/Services/NotifyService";
import {InventarioService} from "../../Services/InventarioService";
import {MovimientoInventarioModel} from "../../Models/MovimientoInventarioModel";
import {RouteParams, Router, ROUTER_DIRECTIVES} from "angular2/router";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {TextPipe} from "../../../Pipes/TextPipe";
import {Controller} from "../../../App/Controller";
import {MovimientoMaterialModel} from "../../Models/MovimientoMaterialModel";

@Component({
    selector : 'ver-movimiento',
    pipes : [DatetimePipe, TextPipe],
    directives : [ROUTER_DIRECTIVES],
    template : `
<div class="container-fluid">
    <h4>Detalles del Movimiento #{{ movimientoInventario?.id}}</h4>
    <div class="row">
      <div class="col-sm-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="row">
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Tipo</dt><dd>{{ (movimientoInventario?.tipoMovimiento == 1) ? 'Ingreso' : 'Egreso' }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Motivo</dt><dd>{{movimientoInventario?.motivoMovimiento?.nombre}}</dd>
                        </dl>                   
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Fecha</dt><dd>{{movimientoInventario?.fecha | datetime }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Bodega</dt><dd><a [routerLink]="['/Administracion/Bodegas/VerBodega', {id : movimientoInventario?.bodega?.id }]">{{ movimientoInventario?.bodega?.nombre }}</a></dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Materiales</dt><dd>{{movimientoInventario?.movimientosMateriales?.length}}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Usuario</dt><dd>Admin</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="row">
                        <div *ngIf="movimientoInventario?.motivoMovimiento?.id == 1">
                            <dl class="col-xs-6 col-sm-12 col-md-6">
                                <dt>Proveedor</dt><dd>{{movimientoInventario?.detalle?.proveedor?.razonSocial}}</dd>
                            </dl>
                            <dl class="col-xs-6 col-sm-12 col-md-6">
                                <dt>Factura</dt><dd>{{movimientoInventario?.detalle?.factura}}</dd>
                            </dl>
                        </div>
                        <div *ngIf="movimientoInventario?.motivoMovimiento?.id == 2 || movimientoInventario?.motivoMovimiento?.id == 5">
                            <dl class="col-xs-6 col-sm-12 col-md-6">
                                <dt>Bodega</dt><dd>{{movimientoInventario?.detalle?.bodega?.nombre}}</dd>
                            </dl>
                            <dl class="col-xs-6 col-sm-12 col-md-6">
                                <dt>#Confirmaci&oacute;n</dt><dd>{{movimientoInventario?.detalle?.confirmacion}}</dd>
                            </dl>
                        </div>
                        <dl class="col-xs-12">
                            <dt>Obsevaciones</dt>
                            <dd>
                                <pre class="text-block">{{movimientoInventario?.notas}}</pre>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h4>Detalle de Materiales</h4>
    <table class="table table-hover">
        <thead>
            <tr>
                <th class="hidden-xs">Codigo</th>
                <th>Material</th>
                <th class="hidden-xs">Tipo</th>
                <th class="text-center">Previo</th>
                <th class="text-center">Cantidad</th>
                <th class="text-center">Final</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="#movimiento of movimientoInventario?.movimientosMateriales" [routerLink]="['/Inventario/InventarioExistente/InventarioDetalle', { materialId : movimiento.material.id, bodegaId : movimiento.bodega.id }]" class="router">
                <td class="hidden-xs">{{movimiento.material.codigo}}</td>
                <td><a [routerLink]="['/Administracion/Materiales/VerMaterial', { id : movimiento.material.id }]">{{ movimiento.material.nombre }}</a></td>
                <td class="hidden-xs">{{movimiento.material.tipoMaterial.nombre}}</td>
                <td class="text-center">{{movimiento.cantidadPrevia}}</td>
                <td class="text-center">{{cantidadFormato(movimiento)}}</td>
                <td class="text-center">{{cantidadTotal(movimiento)}}</td>
                <td class="text-center"><i class="fa fa-ellipsis-v"></i></td>
            </tr>
        </tbody>
    </table>
</div>`
})
export class VerMovimientoComponent extends Controller {
    movimientoInventario : MovimientoInventarioModel;

    constructor(_notifyService : NotifyService,
                public _param : RouteParams,
                public _router : Router,
                public _inventarioService : InventarioService) { super(_notifyService) }

    ngOnInit() {
        const id = parseInt(this._param.get("id"));

        this._notifyService.loader(true);
        this._inventarioService.getMovimiento(id).subscribe(
            movimeintoInventario => {
                this.movimientoInventario = movimeintoInventario;
                this._notifyService.loader(false);
            },
            error => {
                this._notifyService.error(error.json());
                this._notifyService.loader(false);
                this._router.navigate(['/Inventario/MovimientosInventario/ListaMovimientosInventario']);
            }
        );
    }

    cantidadTotal(movimiento : MovimientoMaterialModel) : number {
        return ( movimiento.tipoMovimiento == 0 ) ?
            movimiento.cantidadPrevia - movimiento.cantidad:
            movimiento.cantidadPrevia + movimiento.cantidad;
    }

    cantidadFormato(movimiento : MovimientoMaterialModel) : string {
        let signo = ( movimiento.tipoMovimiento == 0 ) ? "-" : "+";
        return signo + movimiento.cantidad;
    }
}