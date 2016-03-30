import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

import {MovimientoInventarioModel} from "../../Models/MovimientoInventarioModel";
import {InventarioService} from "../../Services/InventarioService";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";

@Component({
    selector: 'lista-movimientos',
    pipes: [DatetimePipe],
    directives: [ROUTER_DIRECTIVES],
    template: `<div class="container-fluid">
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Origen</th>
                    <th>Motivo</th>
                    <th>Bodega</th>
                    <th>#Materiales</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#movimiento of movimientos">
                    <td>{{ movimiento.fecha | datetime}}</td>
                    <td>{{ (movimiento.tipoMovimiento == 1) ? "Ingreso" : "Egreso" }}</td>
                    <td>{{ movimiento.motivoMovimiento.nombre }}</td>
                    <td>{{ movimiento.bodega.nombre }}</td>
                    <td>{{ movimiento.movimientosMateriales.length }}</td>
                    <td><i class="fa fa-eye"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>`
})
export class ListaMovimientosInventarioComponent {
    movimientos : MovimientoInventarioModel[];

    constructor(public _inventarioService : InventarioService) {}
    
    ngOnInit() {
        this._inventarioService.getMovimientos()
            .subscribe(movimientos => this.movimientos = movimientos);
    }
}