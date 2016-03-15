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
            <h3>Plantaciones</h3>
            <ul class="nav nav-tabs">
                <li><a [routerLink]="['ListaPlantaciones']">Ver Plantaciones</a></li>
                <li><a [routerLink]="['IngresarPlantacion']">Ingresar Plantacion</a></li>
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