import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {IngresarClientesComponent} from "./Clientes/IngresarClientesComponent";
import {ListaClientesComponent} from "./Clientes/ListaClientesComponent";
import {VerClienteComponent} from "./Clientes/VerClienteComponent";

@Component({
    selector : 'clientes',
    directives: [ROUTER_DIRECTIVES],
    template : `
    <div class="shelf-drawer">
        <div class="container-fluid">
            <h3>Clientes</h3>
            <ul class="nav nav-tabs">
                <li><a [routerLink]="['ListaClientes']">Ver Clientes</a></li>
                <li><a [routerLink]="['IngresarClientes']">Ingresar Cliente</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>
    `
})
@RouteConfig([
    { path: '/', name: 'ListaClientes', component: ListaClientesComponent, useAsDefault: true },
    { path: '/ingresar', name: 'IngresarClientes', component: IngresarClientesComponent },
    { path: '/:id', name: 'VerCliente', component: VerClienteComponent }
])
export class ClientesComponent {
    constructor() {}
}