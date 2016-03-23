import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {ProductoresComponent} from "./Administracion/ProductoresComponent";
import {MaterialesComponent} from "./Administracion/MaterialesComponent";
import {BodegasComponents} from "./Administracion/BodegasComponents";
import {PlantacionesComponents} from "./Administracion/PlantacionesComponents";
import {ProveedoresComponent} from "./Administracion/ProveedoresComponent";

@Component({
    selector : 'recursos',
    directives: [ROUTER_DIRECTIVES],
    template : `
    <div class="sidebar">
        <ul class="nav nav-pills nav-stacked">
            <li><a [routerLink]="['Productores']"><i class="fa fa-users fa-fw"></i> Productores</a></li>
            <li><a [routerLink]="['Materiales']"><i class="fa fa-cubes fa-fw"></i> Materiales</a></li>
            <li><a [routerLink]="['Bodegas']"><i class="fa fa-folder-o fa-fw"></i> Bodegas</a></li>
            <li><a [routerLink]="['Plantaciones']"><i class="fa fa-folder-o fa-fw"></i> Plantaciones</a></li>
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
    { path: '/plantaciones/...', name: 'Plantaciones', component: PlantacionesComponents },
    { path: '/proveedor/...', name: 'Proveedores', component: ProveedoresComponent }
])
export class AdministracionComponent {

    constructor() {}

    ngOnInit() {
        var links = document.querySelectorAll(".sidebar a");
        for(var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function() {
                document.querySelector(".sidebar").classList.remove("open");
            })
        }
    }
}