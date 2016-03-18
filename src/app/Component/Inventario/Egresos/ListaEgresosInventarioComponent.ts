import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

import {MovimientosInventarioService} from "../../../Service/Inventario/MovimientosInventarioService";
import {MovimientoInventarioModel} from "../../../Model/Inventario/MovimientoInventarioModel";

@Component({
    selector: 'lista-egresos-inventario',
    directives: [],
    template: `<div class="container-fluid">
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Destino</th>
                    <th>Bodega</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#egreso of egresos">
                    <td>{{ egreso.fecha }}</td>>
                    <td>{{ egreso.motivoMovimiento }}</td>
                    <td>{{ egreso.bodega.nombre }}</td>
                    <td><i class="fa fa-pencil"></i></td>
                    <td><i class="fa fa-trash-o"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>`
})
export class ListaEgresosInventarioComponent {
    egresos : Array<MovimientoInventarioModel>;

    constructor(public _movimientosService : MovimientosInventarioService) {
        this.egresos = this._movimientosService.getEgresos();
    }
}