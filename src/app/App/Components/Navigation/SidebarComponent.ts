import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector : 'sidebar',
    directives: [ROUTER_DIRECTIVES],
    template :
`<div id="sidebar">
    <div id="ui-mask"></div>
    <ul id="nav-section">
        <li *ngFor="#nav of navegacion">
            <a  class="router-trigger" (click)="toggleSection($event)">
                <i class="fa fa-folder-open-o fa-fw"> </i> {{ nav.label }}
            </a>
            <ul>
                <li *ngFor="#child of nav.children">
                    <a [routerLink]="[nav.route + child.route]">
                    <i class="fa fa-folder-o fa-fw"> </i> {{ child.label }}</a>    
                </li>
            </ul>
        </li>
    </ul>
</div>`
})
export class SidebarComponent {
    navegacion : any[];

    constructor() {
        let administracion = {
            label : "Admininstracion", route : "/Administracion",
            children : [
                { label : "Productores", route : "/Productores" },
                { label : "Materiales", route : "/Materiales" },
                { label : "Bodegas", route : "/Bodegas" },
                { label : "Proveedores", route : "/Proveedores" },
            ]
        };

        let inventario = {
            label : "Inventario", route : "/Inventario",
            children : [
                { label : "Existente", route : "/InventarioExistente" },
                { label : "Movimientos", route : "/MovimientosInventario" }
            ]
        };

        this.navegacion = [administracion, inventario];
    }

    ngOnInit() {
        document.querySelector('.nav-trigger').addEventListener('click', () => document.querySelector('#sidebar').classList.toggle('open'));
        document.querySelector('body').addEventListener('click', (event) => {
            var clicked = <HTMLDivElement>event.target;
            var isTrigger = clicked.parentElement.classList.contains('nav-trigger') || clicked.classList.contains('nav-trigger');

            if(!clicked.classList.contains('router-trigger') && !isTrigger)
                document.querySelector("#sidebar").classList.remove("open")
        });

    }

    toggleSection(e) {
        
    }
}