import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES} from 'angular2/router';

import {PlantacionModel} from "../../../Model/Administracion/PlantacionModel";
import {AdministracionService} from "../../../Service/AdministracionService";

@Component({
    selector  : 'lista-plantaciones',
    directives: [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Lista de Plantaciones</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Propietario</th>
                        <th>Tamana&ntilde;o</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#plantacion of plantaciones" [routerLink]="['VerPlantacion', { id : plantacion.id }]" class="router">
                        <td>{{ plantacion.nombre }}</td>
                        <td>{{ plantacion.producto.nombre }}</td>
                        <td>{{ plantacion.tipo_producto.nombre }}</td>
                        <td>{{ plantacion.propietario.razon_social }}</td>
                        <td>{{ plantacion.tamano }} {{ plantacion.unidad.nombre }}</td>
                        <td><i class="fa fa-pencil"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaPlantacionesComponent {
    plantaciones : Array<PlantacionModel> = [];

    constructor(public _administracionService : AdministracionService) {
        this._administracionService.getPlantaciones().subscribe(plantaciones => this.plantaciones = plantaciones)
    }
}