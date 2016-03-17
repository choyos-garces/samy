import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {ListaEgresosInventarioComponent} from "./Egresos/ListaEgresosInventarioComponent";
import {EgresarInventarioComponent} from "./Egresos/EgresarInventarioComponent";
import {VerEgresoInventarioComponent} from "./Egresos/VerEgresoInventarioComponent";

@Component({
    selector : 'egreso-inventario',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="shelf-drawer">
        <div class="container-fluid">
            <h1>Inventario / Egresos</h1>
            <ul class="nav nav-pills">
                <li><a [routerLink]="['EgresarInventario']" class="action alert"><i class="fa fa-arrow-circle-o-up"></i> Egresar Material</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>`
})
@RouteConfig([
    { path : '/', name : 'ListaEgresosInventario', component : ListaEgresosInventarioComponent, useAsDefault : true },
    { path : '/egresar', name : 'EgresarInventario', component : EgresarInventarioComponent },
    { path : '/:id', name : 'VerEgresoInventario', component : VerEgresoInventarioComponent }
])
export class EgresosInventarioComponent {}