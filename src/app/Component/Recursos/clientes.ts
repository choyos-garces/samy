import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {IngresarClientes} from "./Clientes/ingresarClientes";
import {ListaClientes} from "./Clientes/listaClientes";

@Component({
    selector : 'clientes',
    template : `
    <h3>Listado de Clientes</h3>
    <ul>
        <li><a [routerLink]="['ListaClientes']">Ver Clientes</a></li>
        <li><a [routerLink]="['IngresarClientes']">Ingresar Cliente</a></li>
    </ul>
    <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/', name: 'ListaClientes', component: ListaClientes, useAsDefault: true },
    { path: '/ingresar', name: 'IngresarClientes', component: IngresarClientes },
])
export class Clientes {

    constructor() {
    }

    ngOnInit() {}
}