import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

import {MovimientosInventarioService} from "../../../Service/Inventario/MovimientosInventarioService";
import {MovimientoInventarioModel} from "../../../Model/Inventario/MovimientoInventarioModel";

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
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#ingreso of movimientos">
                    <td>{{ ingreso.fecha }}</td>
                    <td>{{ ingreso.motivoMovimiento }}</td>
                    <td>{{ ingreso.bodega.nombre }}</td>
                    <td><i class="fa fa-pencil"></i></td>
                    <td><i class="fa fa-trash-o"></i></td>
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