import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {InventarioExistenteComponent} from "./Inventario/Components/InventarioExistenteComponent";
import {MovimientosInventarioComponent} from "./Inventario/Components/MovimientosInventarioComponent";

@Component({
    selector : 'inventario',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="sidebar">
        <ul class="nav nav-pills nav-stacked">
            <li><a [routerLink]="['InventarioExistente']"><i class="fa fa-pie-chart fa-fw"></i> Existente</a></li>
            <li><a [routerLink]="['MovimientosInventario']"><i class="fa fa-table fa-fw"></i> Movimientos</a></li>
        </ul>
    </div>
    <div class="main">
        <router-outlet></router-outlet>
    </div>
    `
})
@RouteConfig([
    { path : '/', name : 'InventarioExistente', component : InventarioExistenteComponent, useAsDefault : true },
    { path : '/movimientos/...', name : 'MovimientosInventario', component : MovimientosInventarioComponent },
])
export class InventarioComponent {

    constructor() {}
}