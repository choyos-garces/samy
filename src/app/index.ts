import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {NotifyComponent} from "./Notify/Components/NotifyComponent";
import {DashboardComponent} from "./App/Components/Navigation/DashboardComponent";
import {SidebarComponent} from "./App/Components/Navigation/SidebarComponent";

import {AdministracionComponent} from "./AdministracionComponent";
import {InventarioComponent} from "./InventarioComponent";

@Component({
    selector : 'index',
    directives : [NotifyComponent, ROUTER_DIRECTIVES, DashboardComponent, SidebarComponent],
    template :
`<dashboard></dashboard>
<notify></notify>
<sidebar></sidebar>
<div id="main">
    <router-outlet></router-outlet>
</div>`

})
@RouteConfig([
    { path: '/administracion/...', name: 'Administracion', component: AdministracionComponent, useAsDefault: true },
    { path: '/inventario/...', name: 'Inventario', component: InventarioComponent }
])
export class Index {
    constructor() {}
}