import {Component} from 'angular2/core'
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {ListaInventarioExistenteComponent} from "./Existente/ListaInventarioExistenteComponent";
import {InventarioDetalleComponent} from "./Existente/InventarioDetalleComponent";

@Component({
    selector : 'inventario-existente',
    directives : [ROUTER_DIRECTIVES],
    template : 
`<div class="shelf-drawer">
    <div class="container-fluid">
        <h1>Inventario / <a [routerLink]="['/Inventario/InventarioExistente']">Existente</a></h1>
        <ul class="nav nav-pills"></ul>
    </div>
</div>
<router-outlet></router-outlet>`
})
@RouteConfig([
    { path : '/', name: 'ListaInventarioExistente', component : ListaInventarioExistenteComponent, useAsDefault: true },
    { path : '/material/:materialId/bodega/:bodegaId', name: 'InventarioDetalle', component : InventarioDetalleComponent },
])
export class InventarioExistenteComponent {}