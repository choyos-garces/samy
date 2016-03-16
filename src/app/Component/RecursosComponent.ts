import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {ProductoresComponent} from "./Recursos/ProductoresComponent";
import {MaterialesComponent} from "./Recursos/MaterialesComponent";
import {BodegasComponents} from "./Recursos/BodegasComponents";
import {PlantacionesComponents} from "./Recursos/PlantacionesComponents";
import {ProveedoresComponent} from "./Recursos/ProveedoresComponent";

@Component({
    selector : 'recursos',
    directives: [ROUTER_DIRECTIVES],
    template : `
    <div class="sidebar">
        <ul class="nav nav-pills nav-stacked">
            <li><a [routerLink]="['Productores']"><i class="fa fa-users fa-fw"></i> Productores</a></li>
            <li><a [routerLink]="['Materiales']"><i class="fa fa-cubes fa-fw"></i> Materiales</a></li>
            <li><a [routerLink]="['Bodegas']"><i class="fa fa-folder-o fa-fw"></i> Bodegas</a></li>
            <li><a [routerLink]="['Plantacion']"><i class="fa fa-folder-o fa-fw"></i> Plantaciones</a></li>
            <li><a [routerLink]="['Proveedores']"><i class="fa fa-industry fa-fw"></i> Proveedores</a></li>
        </ul>
    </div>
    <div class="main">
        <router-outlet></router-outlet>
    </div>
    `
})
@RouteConfig([
    { path: '/productores/...', name: 'Productores', component: ProductoresComponent, useAsDefault: true },
    { path: '/materiales/...', name: 'Materiales', component: MaterialesComponent },
    { path: '/bodegas/...', name: 'Bodegas', component: BodegasComponents },
    { path: '/plantacion/...', name: 'Plantacion', component: PlantacionesComponents },
    { path: '/proveedor/...', name: 'Proveedores', component: ProveedoresComponent }
])
export class RecursosComponent {

    constructor() {}
}