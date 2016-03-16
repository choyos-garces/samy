import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {InventarioExistenteComponent} from "./Inventario/InventarioExistenteComponent";
import {EgresosInventarioComponent} from "./Inventario/EgresosInventarioComponent";
import {IngresosInventarioComponent} from "./Inventario/IngresosInventarioComponent";

@Component({
    selector : 'inventario',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="sidebar">
        <ul class="nav nav-pills nav-stacked">
            <li><a [routerLink]="['InventarioExistente']"><i class="fa fa-pie-chart fa-fw"></i> Existente</a></li>
            <li><a [routerLink]="['IngresosInventario']"><i class="fa fa-folder-o fa-fw"></i> Ingresos</a></li>
            <li><a [routerLink]="['EgresosInventario']"><i class="fa fa-folder-o fa-fw"></i> Egresos</a></li>
        </ul>
    </div>
    <div class="main">
        <router-outlet></router-outlet>
    </div>
    `
})
@RouteConfig([
    { path : '/', name : 'InventarioExistente', component : InventarioExistenteComponent, useAsDefault : true },
    { path : '/egresos/...', name : 'EgresosInventario', component : EgresosInventarioComponent },
    { path : '/ingresos/...', name : 'IngresosInventario', component : IngresosInventarioComponent }
])
export class InventarioComponent {

    constructor() {}
}