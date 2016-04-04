import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {ListaMovimientosInventarioComponent} from "./Movimientos/ListaMovimientosInventarioComponent";
import {IngresarMovimientoInventario} from "./Movimientos/IngresarMovimientoInventarioComponent";
import {VerMovimientoComponent} from "./Movimientos/VerMovimientoComponent";

@Component({
    selector : 'movimientos-inventario',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="shelf-drawer">
        <div class="container-fluid">
            <h1>Inventario / Movimiento</h1>
            <ul class="nav nav-pills">
                <li><a [routerLink]="['IngresarMovimientoInventario']" class="action"><i class="fa fa-arrow-circle-o-down"></i> Realizar Movimiento</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>`
})
@RouteConfig([
    { path : '/', name: 'ListaMovimientosInventario', component : ListaMovimientosInventarioComponent, useAsDefault: true },
    { path : '/ingresar', name : 'IngresarMovimientoInventario', component: IngresarMovimientoInventario },
    { path : '/:id', name: 'VerMovimientoInventario', component : VerMovimientoComponent }
])

export class MovimientosInventarioComponent {}