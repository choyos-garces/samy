import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {RecursosComponent} from "./RecursosComponent";
import {InventarioComponent} from "./InventarioComponent";
import {Error404Component} from "./Error404Component";

@Component({
    selector : 'index',
    template : `
    <div class="dashboard">
        <div class="container">
            <ul class="list-inline">
                <li><a [routerLink]="['Recursos']">Recursos</a></li>
                <li><a [routerLink]="['Inventario']">Inventario</a></li>
            </ul>
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
    { path: '/recursos/...', name: 'Recursos', component: RecursosComponent, useAsDefault: true },
    { path: '/inventario/...', name: 'Inventario', component: InventarioComponent }
])
export class Index {

    constructor() {
    }

    ngOnInit() {}
}