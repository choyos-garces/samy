import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector : 'sidebar',
    directives: [ROUTER_DIRECTIVES],
    template :
`<div id="sidebar">
    <ul id="nav-section">
        <li *ngFor="#nav of navegacion">
            <a [routerLink]="[nav.route]" class="router-section-trigger">{{ nav.label }}</a>
            <ul>
                <li *ngFor="#child of nav.children">
                    <a [routerLink]="[nav.route + child.route]">{{ child.label }}</a>    
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
                { label : "Productores", route : "/InventarioExistente" },
                { label : "Materiales", route : "/MovimientosInventario" }
            ]
        };

        this.navegacion = [administracion, inventario];
    }

    ngOnInit() {
        document.querySelector('body').addEventListener('click', (event) => {
            var clicked = <HTMLDivElement>event.target;
            console.log(typeof event.target);
            if( !clicked.classList.contains("router-section-trigger") || !clicked.classList.contains("nav-trigger"));
            document.querySelector('#sidebar').classList.remove('open');
            console.log('clicked main');
        });

    }
}