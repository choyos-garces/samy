import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {ProductoresComponent} from "./Administracion/Components/ProductoresComponent";
import {MaterialesComponent} from "./Administracion/Components/MaterialesComponent";
import {BodegasComponents} from "./Administracion/Components/BodegasComponents";
import {PlantacionesComponents} from "./Administracion/Components/PlantacionesComponents";
import {ProveedoresComponent} from "./Administracion/Components/ProveedoresComponent";

@Component({
    selector : 'recursos',
    directives: [ROUTER_DIRECTIVES],
    template : '<router-outlet></router-outlet>'
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