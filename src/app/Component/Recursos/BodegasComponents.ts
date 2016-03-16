import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {IngresarBodegaComponent} from "./Bodegas/IngresarBodegaComponent";
import {VerBodegaComponent} from "./Bodegas/VerBodegaComponent";
import {ListaBodegasComponent} from "./Bodegas/ListaBodegasComponent";

@Component({
    selector : 'bodegas',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="shelf-drawer">
        <div class="container-fluid">
            <h1>Recursos / Bodegas</h1>
            <ul class="nav nav-pills">
                <li><a [routerLink]="['IngresarBodega']" class="action"><i class="fa fa-plus"></i> Ingresar Bodega</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>`
})
@RouteConfig([
    { path: "/", name: "ListaBodegas", component: ListaBodegasComponent, useAsDefault: true },
    { path: "/ingresar", name: "IngresarBodega", component: IngresarBodegaComponent },
    { path: "/:id", name: "VerBodega", component: VerBodegaComponent }
])
export class BodegasComponents {
    constructor() {}
}