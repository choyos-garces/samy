import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {Recursos} from "./recursos";
import {Inventario} from "./inventario";

@Component({
    selector : 'index',
    template : `
        <a [routerLink]="['Recursos']">Recursos</a>
        <a [routerLink]="['Inventario']">Inventario</a>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/recursos/...', name: 'Recursos', component: Recursos },
    { path: '/inventario', name: 'Inventario', component: Inventario }
])
export class Index {

    constructor() {
    }

    ngOnInit() {}
}