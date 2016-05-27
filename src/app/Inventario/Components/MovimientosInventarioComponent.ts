import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {ListaMovimientosInventarioComponent} from "./Movimientos/ListaMovimientosInventarioComponent";
import {IngresarMovimientoInventario} from "./Movimientos/IngresarMovimientoInventarioComponent";
import {VerMovimientoComponent} from "./Movimientos/VerMovimientoComponent";
import {EditarMovimientoInventarioComponent} from "./Movimientos/EditarMovimientoInventarioComponent";

@Component({
    selector : 'movimientos-inventario',
    directives : [ROUTER_DIRECTIVES],
    template :
`<div class="shelf-drawer">
    <div class="container-fluid">
        <h1>Inventario / <a [routerLink]="['/Inventario/MovimientosInventario']">Movimiento</a></h1>
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
    { path : '/editar/:id', name : 'EditarMovimientoInventario', component: EditarMovimientoInventarioComponent },
    { path : '/:id', name: 'VerMovimientoInventario', component : VerMovimientoComponent }
])

export class MovimientosInventarioComponent {}