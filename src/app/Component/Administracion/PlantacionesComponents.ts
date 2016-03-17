import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {VerPlantacionComponent} from "./Plantaciones/VerPlantacionComponent";
import {IngresarPlantacionComponent} from "./Plantaciones/IngresarPlantacionComponent";
import {ListaPlantacionesComponent} from "./Plantaciones/ListaPlantacionesComponent";

@Component({
    selector : 'plantaciones',
    directives : [ROUTER_DIRECTIVES],
    template : `
    <div class="shelf-drawer">
        <div class="container-fluid">
            <h1>Administraci&oacute;n / Plantaciones</h1>
            <ul class="nav nav-pills">
                <li><a [routerLink]="['IngresarPlantacion']" class="action"><i class="fa fa-plus"></i> Ingresar Plantaci&oacute;n</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>
    `
})
@RouteConfig([
    { path: "/", name: "ListaPlantaciones", component: ListaPlantacionesComponent, useAsDefault: true },
    { path: "/ingresar", name: "IngresarPlantacion", component: IngresarPlantacionComponent },
    { path: "/:id", name: "VerPlantacion", component: VerPlantacionComponent }
])
export class PlantacionesComponents {
    constructor() {}
}