import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {BodegasService} from "../../../Service/Administracion/BodegasService";
import {BodegaModel} from "../../../Model/Administracion/BodegaModel";
import {PlantacionModel} from "../../../Model/Administracion/PlantacionModel";
import {PlantacionesService} from "../../../Service/Administracion/PlantacionesService";

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
                        <td>{{ plantacion.producto.label }}</td>
                        <td>{{ plantacion.tipo.label }}</td>
                        <td>{{ plantacion.propietario.nombre }}</td>
                        <td>{{ plantacion.tamano }} {{ plantacion.unidad.label }}.</td>
                        <td><i class="fa fa-pencil"></i></td>
                        <td><i class="fa fa-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaPlantacionesComponent {
    plantaciones : Array<PlantacionModel> = [];

    constructor(public _plantacionesService : PlantacionesService) {
        this.plantaciones  = this._plantacionesService.plantaciones;
    }
}