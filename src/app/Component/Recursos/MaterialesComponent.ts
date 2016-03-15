import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ListaMaterialesComponent} from "./Materiales/ListaMaterialesComponent";
import {IngresarMaterialComponent} from "./Materiales/IngresarMaterialComponent";
import {VerMaterialComponent} from "./Materiales/VerMaterialComponent";

@Component({
    selector : 'materiales',
    directives : [ROUTER_DIRECTIVES],
    template : `
    <div class="shelf-drawer">
        <div class="container-fluid">
            <h3>Materiales</h3>
            <ul class="nav nav-tabs">
                <li><a [routerLink]="['ListaMateriales']">Ver Materiales</a></li>
                <li><a [routerLink]="['IngresarMaterial']">Ingresar Material</a></li>
            </ul>
        </div>
    </div>
    <router-outlet></router-outlet>
    `
})
@RouteConfig([
    { path: "/", name: "ListaMateriales", component: ListaMaterialesComponent, useAsDefault: true },
    { path: "/ingresar", name: "IngresarMaterial", component: IngresarMaterialComponent },
    { path: "/:id", name: "VerMaterial", component: VerMaterialComponent }
])
export class MaterialesComponent {
    constructor() {}

}