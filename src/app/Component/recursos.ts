import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {Clientes} from "./Recursos/clientes";
import {Materiales} from "./Recursos/materiales";

@Component({
    selector : 'recursos',
    template : `
    <h1>Recursos</h1>
    <ul>
        <li><a [routerLink]="['Clientes']">Cliente</a></li>
        <li><a [routerLink]="['Materiales']">Materiales</a></li>
    </ul>
    <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/clientes/...', name: 'Clientes', component: Clientes, useAsDefault: true },
    { path: '/materiales', name: 'Materiales', component: Materiales }
])
export class Recursos {

    constructor() {
    }

    ngOnInit() {}
}