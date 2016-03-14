import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ClientesComponent} from "./Recursos/ClientesComponent";
import {MaterialesComponent} from "./Recursos/MaterialesComponent";

@Component({
    selector : 'recursos',
    template : `
    <div class="sidebar">
        <h1>Recursos</h1>
        <ul class="nav nav-pills nav-stacked">
            <li><a [routerLink]="['Clientes']">Cliente</a></li>
            <li><a [routerLink]="['Materiales']">Materiales</a></li>
        </ul>
    </div>
    <div class="main">
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/clientes/...', name: 'Clientes', component: ClientesComponent, useAsDefault: true },
    { path: '/materiales', name: 'Materiales', component: MaterialesComponent }
])
export class RecursosComponent {

    constructor() {
    }

    ngOnInit() {}
}