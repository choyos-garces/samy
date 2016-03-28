import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

import {MovimientosInventarioService} from "../../Services/MovimientosInventarioService";
import {MovimientoInventarioModel} from "../../Models/MovimientoInventarioModel";

@Component({
    selector: 'lista-movimientos',
    directives: [ROUTER_DIRECTIVES],
    template: `<div class="container-fluid">
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Origen</th>
                    <th>Bodega</th>
                    <th>#Materiales</th>
                    <th>Motivo</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#movimiento of movimientos">
                    <td>{{ movimiento.fecha | date : "MM/dd/yy hh:mm"}}</td>
                    <td>{{ (movimiento.tipoMovimiento == 1) ? "Ingreso" : "Egreso" }}</td>
                    <td>{{ movimiento.bodega.nombre }}</td>
                    <td>{{ movimiento.movimientosMateriales.length }}</td>
                    <td>{{ movimiento.motivoMovimiento.label }}</td>
                    <td><i class="fa fa-eye"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>`
})
export class ListaMovimientosInventarioComponent {
    movimientos : Array<MovimientoInventarioModel>;

    constructor(public _movimientosService : MovimientosInventarioService) {
        this.movimientos = this._movimientosService.movimientosInventario;
    }
}