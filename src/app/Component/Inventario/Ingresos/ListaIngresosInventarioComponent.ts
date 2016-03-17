import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

import {MovimientosInventarioService} from "../../../Service/Inventario/MovimientosInventarioService";
import {MovimientoInventarioModel} from "../../../Model/Inventario/MovimientoInventarioModel";

@Component({
    selector: 'lista-ingresos-inventario',
    directives: [ROUTER_DIRECTIVES],
    template: `<div class="container-fluid">
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Material</th>
                    <th>Cantidad</th>
                    <th>Origen</th>
                    <th>Bodega</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#ingreso of ingresos">
                    <td>{{ ingreso.getFecha() }}</td>
                    <td>{{ ingreso.material.nombre }}</td>
                    <td>{{ ingreso.cantidad }}</td>
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
export class ListaIngresosInventarioComponent {
    ingresos : Array<MovimientoInventarioModel>;

    constructor(public _movimientosService : MovimientosInventarioService) {
        this.ingresos = this._movimientosService.getIngresos();
    }
}