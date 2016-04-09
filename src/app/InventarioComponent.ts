import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {InventarioExistenteComponent} from "./Inventario/Components/InventarioExistenteComponent";
import {MovimientosInventarioComponent} from "./Inventario/Components/MovimientosInventarioComponent";

@Component({
    selector : 'inventario',
    directives : [ROUTER_DIRECTIVES],
    template : '<router-outlet></router-outlet>'
})
@RouteConfig([
    { path : '/existente/...', name : 'InventarioExistente', component : InventarioExistenteComponent, useAsDefault : true },
    { path : '/movimientos/...', name : 'MovimientosInventario', component : MovimientosInventarioComponent },
])
export class InventarioComponent {

    constructor() {}
}