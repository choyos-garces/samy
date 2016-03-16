import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";

import {ListaIngresosInventarioComponent} from "./Ingresos/ListaIngresosInventarioComponent";
import {VerIngresoInventarioComponent} from "./Ingresos/VerIngresoInventarioComponent";
import {IngresarInventarioComponent} from "./Ingresos/IngresarInventarioComponent";

@Component({
    selector : 'ingresos-inventario',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="shelf-drawer">
        <div class="container-fluid">
            <h1>Inventarios / Ingresos</h1>
            <ul class="nav nav-pills">
                <li><a [routerLink]="['IngresarInventario']" class="action"><i class="fa fa-arrow-circle-o-down"></i> Ingresar Material</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>`
})
@RouteConfig([
    { path : '/', name : 'ListaIngresosInventario', component : ListaIngresosInventarioComponent, useAsDefault : true },
    { path : '/ingresar', name : 'IngresarInventario', component : IngresarInventarioComponent },
    { path : '/:id', name : 'VerIngresoInventario', component : VerIngresoInventarioComponent }
])
export class IngresosInventarioComponent {}