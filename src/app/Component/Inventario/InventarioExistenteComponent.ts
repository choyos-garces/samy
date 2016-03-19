import {Component} from 'angular2/core'
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector : 'inventario-existente',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="shelf-drawer">
        <div class="container-fluid">
            <h1>Inventario / Existente</h1>
            <ul class="nav nav-pills"></ul>
        </div>
    </div>
    <router-outlet></router-outlet>`
})
export class InventarioExistenteComponent {}