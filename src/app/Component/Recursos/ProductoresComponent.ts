import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {IngresarProductorComponent} from "./Productores/IngresarProductorComponent";
import {ListaProductoresComponent} from "./Productores/ListaProductoresComponent";
import {VerProductorComponent} from "./Productores/VerProductorComponent";

@Component({
    selector : 'productores',
    directives : [ROUTER_DIRECTIVES],
    template : `
    <div class="shelf-drawer">
        <div class="container-fluid">
            <h1>Recursos / Productores</h1>
            <ul class="nav nav-pills">
                <li><a [routerLink]="['IngresarProductor']" class="action"><i class="fa fa-plus"></i> Nuevo Productor</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>
    `
})
@RouteConfig([
    { path: '/', name: 'ListaProductores', component: ListaProductoresComponent, useAsDefault: true },
    { path: '/ingresar', name: 'IngresarProductor', component: IngresarProductorComponent },
    { path: '/:id', name: 'VerProductor', component: VerProductorComponent }
])
export class ProductoresComponent {
    constructor() {}
}