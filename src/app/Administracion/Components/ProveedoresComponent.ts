import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {IngresarProveedorComponent} from "./Proovedores/IngresarProveedorComponent";
import {ListaProveedoresComponent} from "./Proovedores/ListaProveedoresComponent";
import {VerProveedorComponent} from "./Proovedores/VerProveedorComponent";


@Component({
    selector : 'proveedores',
    directives : [ROUTER_DIRECTIVES],
    template : `
    <div class="shelf-drawer">
        <div class="container-fluid">
            <h1>Administraci&oacute;n / Proveedores</h1>
            <ul class="nav nav-pills">
                <li><a [routerLink]="['IngresarProveedor']" class="action"><i class="fa fa-plus"></i> Nuevo Proveedor</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>
    `
})
@RouteConfig([
    { path: '/', name: 'ListaProveedores', component: ListaProveedoresComponent, useAsDefault: true },
    { path: '/ingresar', name: 'IngresarProveedor', component: IngresarProveedorComponent },
    { path: '/:id', name: 'VerProveedor', component: VerProveedorComponent }
])
export class ProveedoresComponent {
    constructor() {}
}