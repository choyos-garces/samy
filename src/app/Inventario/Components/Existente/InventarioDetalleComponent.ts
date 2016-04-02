import {Component} from "angular2/core";
import {InventarioService} from "../../Services/InventarioService";
import {BodegaModel} from "../../../Administracion/Models/BodegaModel";
import {MaterialModel} from "../../../Administracion/Models/MaterialModel";
import {MovimientoMaterialModel} from "../../Models/MovimientoMaterialModel";
import {RouteParams} from "angular2/router";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {InventarioMaterialModel} from "../../Models/InventarioMaterialModel";

/**
 * Created by Christopher on 4/2/2016.
 */

@Component({
    selector : 'inventario-detalle',
    pipes : [DatetimePipe],
    template : `<div class="container-fluid">
    <h4>Detalle de Inventario</h4>
    <div class="row">
        <div class="col-sm-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Bodega</dt><dd>{{ inventario?.bodega?.nombre }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Bodega</dt><dd>{{ inventario?.bodega?.nombre }}</dd>
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
        <div class="col-sm-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Material</dt><dd>{{ inventario?.material?.nombre }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Tipo</dt><dd>{{ inventario?.material?.tipoMaterial?.nombre }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Codigo Material</dt><dd>{{ inventario?.material?.codigo }}</dd>
                    </dl>
                    <dl class="col-xs-6 col-sm-12 col-md-6">
                        <dt>Total</dt><dd>{{ inventario?.material?.cantidad }}</dd>
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
                <th class="text-center">Detalles</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="#movimiento of movimientosMateriales" class="router">
                <td>{{ movimiento.fecha | datetime }}</td>
                <td class="text-center">{{ movimiento.cantidadPrevia }}</td>
                <td class="text-center">{{ (movimiento.tipoMovimiento == 0) ? "-" : "+" }}{{ movimiento.cantidad }}</td>
                <td class="text-center">{{ total(movimiento.tipoMovimiento, movimiento.cantidadPrevia, movimiento.cantidad) }}</td>
                <td class="text-center">Detalles</td>
            </tr>
        </tbody>
    </table>
</div>`
})
export class InventarioDetalleComponent {
    inventario : InventarioMaterialModel;
    movimientosMateriales : MovimientoMaterialModel[];

    constructor(public _invetarioService : InventarioService,
                public _routeParam : RouteParams) {}

    ngOnInit() {
        const materialId = parseInt(this._routeParam.get("materialId"));
        const bodegaId = parseInt(this._routeParam.get("bodegaId"));

        this._invetarioService.getInventarioDetall(materialId, bodegaId).subscribe(response => {
            this.inventario = response.inventario;
            this.movimientosMateriales = response.movimientos;
        })
    }

    total(operacion, previo, final) {
        previo = parseFloat(previo);
        final = parseFloat(final);
        return operacion == 0 ?
            previo - final :
            previo + final;
    }
}