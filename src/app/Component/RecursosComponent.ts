import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ClientesComponent} from "./Recursos/ClientesComponent";
import {MaterialesComponent} from "./Recursos/MaterialesComponent";
import {BodegasComponents} from "./Recursos/BodegasComponents";
import {PlantacionesComponents} from "./Recursos/PlantacionesComponents";

@Component({
    selector : 'recursos',
    directives: [ROUTER_DIRECTIVES],
    template : `
    <div class="sidebar">
        <h3>Recursos</h3>
        <ul class="nav nav-pills nav-stacked">
            <li><a [routerLink]="['Clientes']">Cliente</a></li>
            <li><a [routerLink]="['Materiales']">Materiales</a></li>
            <li><a [routerLink]="['Bodegas']">Bodegas</a></li>
            <li><a [routerLink]="['Plantacion']">Plantaciones</a></li>
        </ul>
    </div>
    <div class="main">
        <router-outlet></router-outlet>
    </div>
    `
})
@RouteConfig([
    { path: '/clientes/...', name: 'Clientes', component: ClientesComponent, useAsDefault: true },
    { path: '/materiales/...', name: 'Materiales', component: MaterialesComponent },
    { path: '/bodegas/...', name: 'Bodegas', component: BodegasComponents },
    { path: '/plantacion/...', name: 'Plantacion', component: PlantacionesComponents }
])
export class RecursosComponent {

    constructor() {}
}