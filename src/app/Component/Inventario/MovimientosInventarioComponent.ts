import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {ListaMovimientosInventarioComponent} from "./Movimientos/ListaMovimientosInventarioComponent";
import {IngresarMovimientoInventarioComponent} from "./Movimientos/IngresarMovimientoInventarioComponent";

@Component({
    selector : 'movimientos-inventario',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="shelf-drawer">
        <div class="container-fluid">
            <h1>Inventario / Movimiento</h1>
            <ul class="nav nav-pills">
                <li><a [routerLink]="['IngresarMovimientoInventario']" class="action"><i class="fa fa-arrow-circle-o-down"></i> Ingresar Material</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>`
})
@RouteConfig([
    { path : '/', name: 'ListaMovimientosInventrio', component : ListaMovimientosInventarioComponent, useAsDefault: true },
    { path : '/ingresar', name : 'IngresarMovimientoInventario', component: IngresarMovimientoInventarioComponent }
])

export class MovimientosInventarioComponent {}