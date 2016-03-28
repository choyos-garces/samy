import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {AdministracionComponent} from "./AdministracionComponent";
import {InventarioComponent} from "./InventarioComponent";
import {Error404Component} from "./Feedback/Error404Component";

@Component({
    selector : 'index',
    template : `
    <div class="dashboard">
        <div class="container">
            <div class="dash-wrap">
                <a class="toggleSidebar" (click)="toggleSidebar()"><i class="fa fa-navicon"></i></a>
                <ul class="list-inline">
                    <li><a [routerLink]="['Administracion']">Administraci&oacute;n</a></li>
                    <li><a [routerLink]="['Inventario']">Inventario</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container shelf">
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/404', name: 'Error404', component: Error404Component },
    { path: '/administracion/...', name: 'Administracion', component: AdministracionComponent, useAsDefault: true },
    { path: '/inventario/...', name: 'Inventario', component: InventarioComponent }
])
export class Index {

    constructor() {}

    toggleSidebar() {
        document.querySelector(".sidebar").classList.toggle("open")
    }
}